const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Adjust path as needed for your config file

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

const generateDynamicQuery = (kaynakType, secondType) => {
  let baseQuery = "SELECT kaynak.*, GROUP_CONCAT(yazarlar.YazarAdi SEPARATOR ', ') AS YazarAdi ";
  let joinQuery = 'LEFT JOIN yazarlar ON kaynak.KaynakID = yazarlar.KaynakID ';
  const whereClause = 'WHERE kaynak.KaynakID IS NOT NULL'; // Adjust this based on your conditions

  if (kaynakType === 'fiziksel') {
    joinQuery += 'INNER JOIN fiziksel ON kaynak.KaynakID = fiziksel.KaynakID ';
    baseQuery += ', kaynak.FizikselTur, fiziksel.KaynakKonumu ';
  } else if (kaynakType === 'ekaynak') {
    joinQuery += 'INNER JOIN ekaynak ON kaynak.KaynakID = ekaynak.KaynakID ';
    baseQuery += ', ekaynak.DijitalFormat, ekaynak.URL ';
  }

  if (secondType === 'ansiklopedi') {
    joinQuery += 'INNER JOIN ansiklopedi ON kaynak.KaynakID = ansiklopedi.KaynakID ';
    baseQuery += ', ansiklopedi.CiltNo, ansiklopedi.Alan ';
  } else if (secondType === 'dergi') {
    joinQuery += 'INNER JOIN dergi ON kaynak.KaynakID = dergi.KaynakID ';
    baseQuery += ', dergi.YayinTarihi, dergi.Aralik, dergi.Tur ';
  } else if (secondType === 'kitap') {
    joinQuery += 'INNER JOIN kitap ON kaynak.KaynakID = kitap.KaynakID ';
    baseQuery += ', kitap.Konu, kitap.Tur, kitap.Yayinevi ';
  }

  const query = `${baseQuery} FROM kaynak ${joinQuery} ${whereClause} GROUP BY kaynak.KaynakID;`;
  return query;
};

app.get('/api/kaynaklar', (req, res) => {
  const { kaynakType, secondType } = req.query;
  console.log('Received query parameters:', { kaynakType, secondType });

  try {
    const query = generateDynamicQuery(kaynakType, secondType);
    console.log('Generated SQL Query:', query);

    db.query(query)
      .then((data) => {
        console.log('Query result:', data);
        res.json(data[0]);
      })
      .catch((error) => {
        console.error('/api/kaynaklar Error:', error.message);
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    console.error('Error in /api/kaynaklar route:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/kaynaklar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM yazarlar WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM ansiklopedi WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM dergi WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM kitap WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM ekaynak WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM fiziksel WHERE KaynakID = ?', { replacements: [id] });
    await db.query('DELETE FROM kaynak WHERE KaynakID = ?', { replacements: [id] });

    res.status(200).json({ message: 'Kaynak deleted successfully' });
  } catch (error) {
    console.error('Error deleting kaynak:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the kaynak' });
  }
});

app.get('/api/calismaalani', (req, res) => {
  const { Durum, CalismaAlaniID, Kapasite, OdaNo } = req.query;

  let query = 'SELECT * FROM calismaalani WHERE 1=1';

  if (Durum) {
    query += ` AND Durum = '${Durum}'`;
  }
  if (CalismaAlaniID) {
    query += ` AND CalismaAlaniID = '${CalismaAlaniID}'`;
  }
  if (Kapasite) {
    query += ` AND Kapasite = '${Kapasite}'`;
  }
  if (OdaNo) {
    query += ` AND OdaNo = '${OdaNo}'`;
  }

  db.query(query)
    .then((data) => res.json(data[0]))
    .catch((error) => {
      console.error('/api/calismaalani Error:', error.message);
      res.status(500).json({ error: error.message });
    });
});

app.get('/api/calismaalani', async (req, res) => {
  const { Durum, CalismaAlaniID, Kapasite, OdaNo } = req.query;

  let query = 'SELECT * FROM calismaalani WHERE 1=1';

  if (Durum) {
    query += ` AND Durum = '${Durum}'`;
  }
  if (CalismaAlaniID) {
    query += ` AND CalismaAlaniID = '${CalismaAlaniID}'`;
  }
  if (Kapasite) {
    query += ` AND Kapasite = '${Kapasite}'`;
  }
  if (OdaNo) {
    query += ` AND OdaNo = '${OdaNo}'`;
  }

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching calismaalani:', error.message);
    res.status(500).json({ error: 'Error fetching calismaalani' });
  }
});

app.get('/api/rezervasyonlar/:KullaniciID', async (req, res) => {
  const { KullaniciID } = req.params;

  try {
    const query = `
        SELECT * FROM rezervasyonyapar
        WHERE KullaniciID = ?
      `;
    const [results] = await db.query(query, {
      replacements: [KullaniciID],
    });
    res.json(results);
  } catch (error) {
    console.error('Error fetching reservations:', error.message);
    res.status(500).json({ error: 'Rezervasyonlar getirilirken bir hata oluştu' });
  }
});

app.post('/api/rezervasyonlar', async (req, res) => {
  const { KullaniciID, CalismaAlaniID, RezervasyonSaati, RezervasyonTarihi, KisiSayisi } = req.body;
  const RezervasyonDurumu = 'Pending'; // or any default value you'd prefer

  try {
    const query = `
        INSERT INTO rezervasyonyapar (KullaniciID, CalismaAlaniID, RezervasyonSaati, RezervasyonTarihi, KisiSayisi, RezervasyonDurumu)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    await db.query(query, {
      replacements: [KullaniciID, CalismaAlaniID, RezervasyonSaati, RezervasyonTarihi, KisiSayisi, RezervasyonDurumu],
    });

    res.status(201).json({ message: 'Rezervasyon başarıyla eklendi' });
  } catch (error) {
    console.error('Error creating reservation:', error.message);
    res.status(500).json({ error: 'Rezervasyon eklenirken bir hata oluştu' });
  }
});

app.put('/api/calismaalani/:id', async (req, res) => {
  const { id } = req.params;
  const { Durum } = req.body;

  try {
    // Update the Durum of the specified calismaalani
    const query = `
        UPDATE calismaalani
        SET Durum = ?
        WHERE CalismaAlaniID = ?
      `;
    await db.query(query, {
      replacements: [Durum, id],
    });

    res.status(200).json({ message: 'Durum başarıyla güncellendi' });
  } catch (error) {
    console.error('Error updating Durum:', error.message);
    res.status(500).json({ error: 'Durum güncellenirken bir hata oluştu' });
  }
});

app.get('/api/etkinlikler', async (req, res) => {
  const { Durum, EventID, Ad, Aciklama, Konum } = req.query;

  let query = 'SELECT * FROM etkinlik WHERE 1=1';

  if (Durum) {
    query += ` AND Durum = '${Durum}'`;
  }
  if (EventID) {
    query += ` AND EventID = '${EventID}'`;
  }
  if (Ad) {
    query += ` AND Ad LIKE '%${Ad}%'`;
  }
  if (Aciklama) {
    query += ` AND Aciklama LIKE '%${Aciklama}%'`;
  }
  if (Konum) {
    query += ` AND Konum LIKE '%${Konum}%'`;
  }

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching etkinlikler:', error.message);
    res.status(500).json({ error: 'Etkinlikler getirilirken bir hata oluştu' });
  }
});

app.get('/api/etkinliklerim/:KullaniciID', async (req, res) => {
  const { KullaniciID } = req.params;

  try {
    const query = `
        SELECT e.*
        FROM Etkinlik e
        INNER JOIN EtkinligeKatilir ek ON e.EtkinlikID = ek.EtkinlikID
        WHERE ek.KullaniciID = ?
        AND e.BitisTarihi < CURDATE();  -- Using BitisTarihi to filter past events
      `;
    const [results] = await db.query(query, {
      replacements: [KullaniciID],
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'No past events found for this Kullanici ID.' });
    }

    return res.json(results); // Always return a response
  } catch (error) {
    console.error('Error fetching etkinliklerim:', error.message);
    return res.status(500).json({ error: 'An error occurred while fetching the events.' });
  }
});

app.post('/api/kayit', async (req, res) => {
  const { KullaniciID, EtkinlikID } = req.body;

  try {
    const query = `
        INSERT INTO EtkinligeKatilir (KullaniciID, EtkinlikID)
        VALUES (?, ?)
      `;
    await db.query(query, {
      replacements: [KullaniciID, EtkinlikID],
    });

    res.status(201).json({ message: 'Etkinliğe kayıt başarıyla yapıldı' });
  } catch (error) {
    console.error('Error creating kayit:', error.message);
    res.status(500).json({ error: 'Kayıt yapılırken bir hata oluştu' });
  }
});

app.get('/api/kullanici/:KullaniciID', async (req, res) => {
  const { KullaniciID } = req.params;

  try {
    const query = `
        SELECT * FROM Kullanici WHERE KullaniciID = ?
      `;
    const [results] = await db.query(query, {
      replacements: [KullaniciID],
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    return res.json(results[0]); // Ensure a value is returned
  } catch (error) {
    console.error('Error fetching kullanici:', error.message);
    return res.status(500).json({ error: 'Kullanıcı bilgileri getirilirken bir hata oluştu.' });
  }
});

app.post('/api/calismaalani', async (req, res) => {
  const { CalismaAlaniID, Kapasite, Durum, OdaNo } = req.body;

  try {
    const query = `
        INSERT INTO calismaalani (CalismaAlaniID, Kapasite, Durum, OdaNo)
        VALUES (?, ?, ?, ?)
      `;
    await db.query(query, {
      replacements: [CalismaAlaniID, Kapasite, Durum, OdaNo],
    });

    res.status(201).json({ message: 'Çalışma alanı başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding calismaalani:', error.message);
    res.status(500).json({ error: 'Çalışma alanı eklenirken bir hata oluştu.' });
  }
});

app.post('/api/etkinlik', async (req, res) => {
  const { EtkinlikID, Ad, Aciklama, BaslangicTarihi, BitisTarihi, Konum, Kapasite, KatilimciSayisi, Durum } = req.body;

  try {
    const query = `
        INSERT INTO Etkinlik (EtkinlikID, Ad, Aciklama, BaslangicTarihi, BitisTarihi, Konum, Kapasite, KatilimciSayisi, Durum)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    await db.query(query, {
      replacements: [EtkinlikID, Ad, Aciklama, BaslangicTarihi, BitisTarihi, Konum, Kapasite, KatilimciSayisi, Durum],
    });

    res.status(201).json({ message: 'Etkinlik başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding etkinlik:', error.message);
    res.status(500).json({ error: 'Etkinlik eklenirken bir hata oluştu.' });
  }
});

app.get('/api/yonetici/:YoneticiID', async (req, res) => {
  const { YoneticiID } = req.params;

  try {
    const query = `
        SELECT * FROM yonetici WHERE YoneticiID = ?
      `;
    const [results] = await db.query(query, {
      replacements: [YoneticiID],
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Yönetici bulunamadı.' });
    }

    return res.json(results[0]); // Return the yonetici's information
  } catch (error) {
    console.error('Error fetching yonetici:', error.message);
    return res.status(500).json({ error: 'Yönetici bilgileri getirilirken bir hata oluştu.' });
  }
});

app.post('/api/kaynak', async (req, res) => {
  const {
    KaynakAdi, KaynakCikisYili, StokSayisi, IadeEdilmesiGerekenMaxSure,
    SayfaSayisi, Dil, FizikselTur, KaynakTuru, EkleyenYonetici, EklenmeTarihi,
    KaynakKonumu, DijitalFormat, URL,
    CiltNo, Alan, YayinTarihi, Aralik, Tur, Konu, Yayinevi,
  } = req.body;

  let query = `
      INSERT INTO kaynak (
        KaynakAdi, KaynakCikisYili, StokSayisi, IadeEdilmesiGerekenMaxSure, 
        SayfaSayisi, Dil, FizikselTur, KaynakTuru, EkleyenYonetici, EklenmeTarihi
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const replacements = [
    KaynakAdi, KaynakCikisYili, StokSayisi, IadeEdilmesiGerekenMaxSure,
    SayfaSayisi, Dil, FizikselTur, KaynakTuru, EkleyenYonetici, EklenmeTarihi,
  ];

  if (FizikselTur === 'Fiziksel') {
    query += ', KaynakKonumu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    replacements.push(KaynakKonumu);
  } else if (FizikselTur === 'EKaynak') {
    query += ', DijitalFormat, URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    replacements.push(DijitalFormat, URL);
  }

  if (KaynakTuru === 'Ansiklopedi') {
    query += ', CiltNo, Alan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    replacements.push(CiltNo, Alan);
  } else if (KaynakTuru === 'Dergi') {
    query += ', YayinTarihi, Aralik, Tur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    replacements.push(YayinTarihi, Aralik, Tur);
  } else if (KaynakTuru === 'Kitap') {
    query += ', Konu, Tur, Yayinevi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    replacements.push(Konu, Tur, Yayinevi);
  }

  try {
    await db.query(query, {
      replacements,
    });

    res.status(201).json({ message: 'Kaynak başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding kaynak:', error.message);
    res.status(500).json({ error: 'Kaynak eklenirken bir hata oluştu.' });
  }
});

app.get('/api/istatistikler/:YoneticiID', async (req, res) => {
  const { YoneticiID } = req.params;
  const { IstatistikID, Tarih } = req.query;

  let query = `
      SELECT i.IstatistikID, i.Tarih, i.ZiyaretSayisi, i.OduncAlmaSayisi, 
             i.RezervasyonSayisi, i.CezaliKullaniciSayisi
      FROM istatistik i
      INNER JOIN istatistikgorur ig ON i.IstatistikID = ig.IstatistikID
      WHERE ig.YoneticiID = ?
    `;

  const replacements = [YoneticiID];

  if (IstatistikID) {
    query += ' AND i.IstatistikID = ?';
    replacements.push(IstatistikID);
  }

  if (Tarih) {
    query += ' AND i.Tarih = ?';
    replacements.push(Tarih);
  }

  try {
    const [results] = await db.query(query, {
      replacements,
    });

    if (results.length === 0) {
      return res.status(404).json({ error: 'İstatistik bulunamadı.' });
    }

    return res.json(results); // Ensure we return the results
  } catch (error) {
    console.error('Error fetching istatistikler:', error.message);
    return res.status(500).json({ error: 'İstatistikler getirilirken bir hata oluştu.' });
  }
});

app.post('/api/istatistik', async (req, res) => {
  const { IstatistikID, Tarih, ZiyaretSayisi, OduncAlmaSayisi, RezervasyonSayisi, CezaliKullaniciSayisi } = req.body;

  try {
    const query = `
        INSERT INTO istatistik (IstatistikID, Tarih, ZiyaretSayisi, OduncAlmaSayisi, RezervasyonSayisi, CezaliKullaniciSayisi)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    await db.query(query, {
      replacements: [IstatistikID, Tarih, ZiyaretSayisi, OduncAlmaSayisi, RezervasyonSayisi, CezaliKullaniciSayisi],
    });

    res.status(201).json({ message: 'İstatistik başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding istatistik:', error.message);
    res.status(500).json({ error: 'İstatistik eklenirken bir hata oluştu.' });
  }
});

app.post('/api/istatistikgorur', async (req, res) => {
  const { YoneticiID, IstatistikID } = req.body;

  try {
    const query = `
        INSERT INTO istatistikgorur (YoneticiID, IstatistikID)
        VALUES (?, ?)
      `;
    await db.query(query, {
      replacements: [YoneticiID, IstatistikID],
    });

    res.status(201).json({ message: 'Yönetici ile istatistik başarıyla ilişkilendirildi.' });
  } catch (error) {
    console.error('Error linking istatistik to yonetici:', error.message);
    res.status(500).json({ error: 'Yönetici ile istatistik ilişkilendirilirken bir hata oluştu.' });
  }
});

app.post('/api/oduncalir', async (req, res) => {
  const { KullaniciID, KaynakID } = req.body;
  const OduncAlmaTarihi = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

  try {
    const query = `
        INSERT INTO oduncalir (KullaniciID, KaynakID, OduncAlmaTarihi)
        VALUES (?, ?, ?)
      `;
    await db.query(query, {
      replacements: [KullaniciID, KaynakID, OduncAlmaTarihi],
    });

    res.status(201).json({ message: 'Ödünç alma işlemi başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding oduncalir:', error.message);
    res.status(500).json({ error: 'Ödünç alma işlemi eklenirken bir hata oluştu.' });
  }
});

app.post('/api/iadeeder', async (req, res) => {
  const { KullaniciID, KaynakID, GeriVermeTarihi, IadeEdilmesiGerekenTarih } = req.body;

  try {
    const query = `
        INSERT INTO iadeeder (KullaniciID, KaynakID, GeriVermeTarihi, IadeEdilmesiGerekenTarih)
        VALUES (?, ?, ?, ?)
      `;
    await db.query(query, {
      replacements: [KullaniciID, KaynakID, GeriVermeTarihi, IadeEdilmesiGerekenTarih],
    });

    res.status(201).json({ message: 'İade etme işlemi başarıyla eklendi.' });
  } catch (error) {
    console.error('Error adding iadeeder:', error.message);
    res.status(500).json({ error: 'İade etme işlemi eklenirken bir hata oluştu.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
