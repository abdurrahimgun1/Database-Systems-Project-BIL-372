DROP DATABASE IF EXISTS bil372;
CREATE DATABASE bil372;
USE bil372;


CREATE TABLE Yonetici(
	YoneticiID INT NOT NULL AUTO_INCREMENT,
	Ad VARCHAR(30) NOT NULL,
	Soyad VARCHAR(30) NOT NULL,
	Email VARCHAR(100) NOT NULL UNIQUE,
	Sifre VARCHAR(255) NOT NULL,
	Telefon VARCHAR(15) UNIQUE,
	Adres VARCHAR(255),
	PRIMARY KEY(YoneticiID)
);


CREATE TABLE Kaynak(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	KaynakAdi VARCHAR(50) NOT NULL,
	KaynakCikisYili YEAR,
	StokSayisi INT NOT NULL,
	IadeEdilmesiGerekenMaxSure INT NOT NULL,  -- gün sayısı
	SayfaSayisi INT,
	Dil VARCHAR(30),
	FizikselTur VARCHAR(30) NOT NULL,
	KaynakTuru VARCHAR(30) NOT NULL,
	EkleyenYonetici INT NOT NULL,
	EklenmeTarihi DATE,
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(EkleyenYonetici) REFERENCES Yonetici(YoneticiID)
);


CREATE TABLE Kitap(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	Konu VARCHAR(50),
	Tur VARCHAR(30) NOT NULL,
	Yayinevi VARCHAR(50),
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE Ansiklopedi(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	CiltNo INT,
	Alan VARCHAR(50) NOT NULL,
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE Dergi(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	YayinTarihi DATE NOT NULL,
	Aralik VARCHAR(20),
	Tur VARCHAR(30) NOT NULL,
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE Fiziksel(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	KaynakKonumu VARCHAR(100) NOT NULL,
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE EKaynak(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	DijitalFormat VARCHAR(15) NOT NULL,
	URL VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY(KaynakID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE Yazarlar(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	YazarAdi VARCHAR(30) NOT NULL,
	PRIMARY KEY(KaynakID, YazarAdi),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE Kullanici(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	Ad VARCHAR(30) NOT NULL,
	Soyad VARCHAR(30) NOT NULL,
	Email VARCHAR(100) NOT NULL UNIQUE,
	Sifre VARCHAR(255) NOT NULL,
	Telefon VARCHAR(15) UNIQUE,
	Adres VARCHAR(255),
	KayitTarihi DATE NOT NULL,
	CezaPuani INT NOT NULL DEFAULT 0,
	PRIMARY KEY(KullaniciID)
);

CREATE TABLE Ogrenci(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	OgrenciNo VARCHAR(20) NOT NULL,
	Bolum VARCHAR(50),
	PRIMARY KEY(KullaniciID, OgrenciNo),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID)
);

CREATE TABLE Mezun(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	OgrenciNo VARCHAR(20) NOT NULL,
	MezuniyetTarihi DATE,
	PRIMARY KEY(KullaniciID, OgrenciNo),
	FOREIGN KEY(KullaniciID) REFERENCES Ogrenci(KullaniciID)
);

CREATE TABLE Aktif(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	OgrenciNo VARCHAR(20) NOT NULL,
	Sinif INT,
	PRIMARY KEY(KullaniciID, OgrenciNo),
	FOREIGN KEY(KullaniciID) REFERENCES Ogrenci(KullaniciID)
);

CREATE TABLE Ogretmen(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	OgretmenNo VARCHAR(20) NOT NULL,
	Rutbe VARCHAR(50),
	Fakulte VARCHAR(50),
	PRIMARY KEY(KullaniciID, OgretmenNo),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID)
);

CREATE TABLE Personel(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	Departman VARCHAR(50),
	Rutbe VARCHAR(50),
	PRIMARY KEY(KullaniciID),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID)
);

CREATE TABLE Sivil(
	KullaniciID INT NOT NULL AUTO_INCREMENT,
	TCKN VARCHAR(11) NOT NULL,  -- Turkish Citizen Number
	Meslek VARCHAR(50),
	PRIMARY KEY(KullaniciID, TCKN),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID)
);

CREATE TABLE CalismaAlani(
	CalismaAlaniID INT NOT NULL AUTO_INCREMENT,
	Kapasite INT NOT NULL,
	Durum VARCHAR(20) NOT NULL,
	OdaNo VARCHAR(10) NOT NULL UNIQUE,
	PRIMARY KEY(CalismaAlaniID)
);

CREATE TABLE Istatistik(
	IstatistikID INT NOT NULL AUTO_INCREMENT,
	Tarih DATE NOT NULL,
	ZiyaretSayisi INT,
	OduncAlmaSayisi INT,
	RezervasyonSayisi INT,
	CezaliKullaniciSayisi INT,
	PRIMARY KEY(IstatistikID)
);

CREATE TABLE Etkinlik(
	EtkinlikID INT NOT NULL AUTO_INCREMENT,
	Ad VARCHAR(100) NOT NULL,
	Aciklama TEXT,
	BaslangicTarihi DATE NOT NULL,
	BitisTarihi DATE NOT NULL,
	Konum VARCHAR(100) NOT NULL,
	Kapasite INT,
	KatilimciSayisi INT DEFAULT 0,
    Durum VARCHAR(10) DEFAULT 'Boş',
	PRIMARY KEY(EtkinlikID)
);

CREATE TABLE OduncAlir(
	KullaniciID INT NOT NULL,
	KaynakID INT NOT NULL,
	OduncAlmaTarihi DATE NOT NULL,
	PRIMARY KEY(KullaniciID, KaynakID),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE IadeEder(
	KullaniciID INT NOT NULL,
	KaynakID INT NOT NULL,
	GeriVermeTarihi DATE NOT NULL,
	IadeEdilmesiGerekenTarih DATE NULL,
	PRIMARY KEY(KullaniciID, KaynakID),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID),
	FOREIGN KEY(KaynakID) REFERENCES Kaynak(KaynakID)
);

CREATE TABLE EtkinligeKatilir(
	KullaniciID INT NOT NULL,
	EtkinlikID INT NOT NULL,
	PRIMARY KEY(KullaniciID, EtkinlikID),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID),
	FOREIGN KEY(EtkinlikID) REFERENCES Etkinlik(EtkinlikID)
);

CREATE TABLE RezervasyonYapar(
	KullaniciID INT NOT NULL,
	CalismaAlaniID INT NOT NULL,
	RezervasyonSaati TIME NOT NULL,
	RezervasyonTarihi DATE NOT NULL,
	RezervasyonDurumu VARCHAR(20) NOT NULL,
	KisiSayisi INT,
	PRIMARY KEY(KullaniciID, CalismaAlaniID),
	FOREIGN KEY(KullaniciID) REFERENCES Kullanici(KullaniciID),
	FOREIGN KEY(CalismaAlaniID) REFERENCES CalismaAlani(CalismaAlaniID)
);

CREATE TABLE IstatistikGorur(
	YoneticiID INT NOT NULL,
	IstatistikID INT NOT NULL,
	PRIMARY KEY(YoneticiID, IstatistikID),
	FOREIGN KEY(YoneticiID) REFERENCES Yonetici(YoneticiID),
	FOREIGN KEY(IstatistikID) REFERENCES Istatistik(IstatistikID)
);

-- Bir kullanıcı bir kaynağı ödünç aldığında (OduncAlir tablosuna veri eklendiğinde) veya iade ettiğinde
-- (IadeEder tablosuna veri eklendiğinde) Kaynak tablosundaki StokSayisi güncellenmelidir.
DELIMITER //

CREATE TRIGGER after_insert_odunc_alir
AFTER INSERT ON OduncAlir
FOR EACH ROW
BEGIN
    UPDATE Kaynak
    SET StokSayisi = StokSayisi - 1
    WHERE KaynakID = NEW.KaynakID;
END //

CREATE TRIGGER after_delete_odunc_alir
AFTER DELETE ON OduncAlir
FOR EACH ROW
BEGIN
    UPDATE Kaynak
    SET StokSayisi = StokSayisi + 1
    WHERE KaynakID = OLD.KaynakID;
END //

DELIMITER ;


DELIMITER //

-- EtkinligeKatilir tablosuna yeni bir katılım eklendiğinde, ilgili Etkinlik tablosundaki 
-- KatilimciSayisi ve Durum alanlarını günceller.

CREATE TRIGGER after_insert_etkinlige_katilir
AFTER INSERT ON EtkinligeKatilir
FOR EACH ROW
BEGIN
    UPDATE Etkinlik
    SET KatilimciSayisi = KatilimciSayisi + 1,
        Durum = CASE
                    WHEN KatilimciSayisi + 1 >= Kapasite THEN 'Dolu'
                    ELSE 'Boş'
                END
    WHERE EtkinlikID = NEW.EtkinlikID;
END //


-- EtkinligeKatilir tablosundan bir katılım silindiğinde, ilgili Etkinlik tablosundaki KatilimciSayisi ve Durum alanlarını günceller.
CREATE TRIGGER after_delete_etkinlige_katilir
AFTER DELETE ON EtkinligeKatilir
FOR EACH ROW
BEGIN
    UPDATE Etkinlik
    SET KatilimciSayisi = KatilimciSayisi - 1,
        Durum = CASE
                    WHEN KatilimciSayisi - 1 >= Kapasite THEN 'Dolu'
                    ELSE 'Boş'
                END
    WHERE EtkinlikID = OLD.EtkinlikID;
END //

DELIMITER ;


#  Bu tetikleyici, yeni eklenen rezervasyonun kişi sayısının,
#  çalışma alanının kapasitesini aşıp aşmadığını kontrol eder.
DELIMITER //

CREATE TRIGGER before_insert_rezervasyon_yapar
BEFORE INSERT ON RezervasyonYapar
FOR EACH ROW
BEGIN
    DECLARE kapasite INT;

    -- Çalışma alanının kapasitesini al
    SELECT Kapasite INTO kapasite
    FROM CalismaAlani
    WHERE CalismaAlaniID = NEW.CalismaAlaniID;

    -- Yeni rezervasyon kişi sayısı kapasiteyi aşıyorsa hata sinyali ver
    IF NEW.KisiSayisi > kapasite THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Çalışma alanı kapasitesi doldu.';
    END IF;
END //

DELIMITER ;

DELIMITER //
-- EtkinligeKatilir tablosuna yeni bir kayıt eklenmeden önce Etkinlik tablosundaki Kapasite ve KatilimciSayisi kontrol edilmelidir.
CREATE TRIGGER before_insert_etkinlige_katilir
BEFORE INSERT ON EtkinligeKatilir
FOR EACH ROW
BEGIN
    DECLARE katilimci_sayisi INT;
    DECLARE kapasite INT;

    SELECT KatilimciSayisi, Kapasite INTO katilimci_sayisi, kapasite
    FROM Etkinlik
    WHERE EtkinlikID = NEW.EtkinlikID;

    IF katilimci_sayisi >= kapasite THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Etkinlik kapasitesi doldu.';
    END IF;
END //

DELIMITER ;

DELIMITER //


#DATEDIFF fonksiyonu, iade tarihi ile ödünç 
#alma tarihi arasındaki gün farkını hesaplar. Bu fark, IadeEdilmesiGerekenMaxSure 
#değerinden çıkarılarak gecikme süresi elde edilir.
#Eğer gecikme_suresi - max_sure pozitifse, yani kullanıcı kitabı geç iade etmişse,
#kullanıcı ceza puanı bu gecikme süresi kadar artırılır.

CREATE TRIGGER after_insert_iade_eder
AFTER INSERT ON IadeEder
FOR EACH ROW
BEGIN
    DECLARE gecikme_suresi INT;
    DECLARE max_sure INT;
    DECLARE yeni_ceza INT;
    
    -- Kitabın ödünç alma süresini ve max süresini hesapla
    SELECT DATEDIFF(NEW.GeriVermeTarihi, OduncAlmaTarihi), IadeEdilmesiGerekenMaxSure
    INTO gecikme_suresi, max_sure
    FROM OduncAlir
    JOIN Kaynak ON OduncAlir.KaynakID = Kaynak.KaynakID
    WHERE OduncAlir.KullaniciID = NEW.KullaniciID AND OduncAlir.KaynakID = NEW.KaynakID;

    -- Eğer gecikme süresi max süreyi aşıyorsa ceza puanını güncelle
    IF gecikme_suresi - max_sure > 0 THEN
        UPDATE Kullanici
        SET CezaPuani = CezaPuani + (gecikme_suresi - max_sure)
        WHERE KullaniciID = NEW.KullaniciID;
    END IF;
END //

DELIMITER ;

#Eğer ceza puanı 14'ten büyükse, tetikleyici bir hata sinyali yükseltir ve
#"Kullanıcının ceza puanı 14'ten büyük olduğu için kitap ödünç alamaz." mesajını gösterir.
DELIMITER //

CREATE TRIGGER before_insert_odunc_alir
BEFORE INSERT ON OduncAlir
FOR EACH ROW
BEGIN
    DECLARE ceza_puani INT;

    -- Kullanıcının ceza puanını al
    SELECT CezaPuani INTO ceza_puani
    FROM Kullanici
    WHERE KullaniciID = NEW.KullaniciID;

    -- Eğer ceza puanı 14'ten büyükse hata sinyali ver
    IF ceza_puani > 14 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Kullanıcının ceza puanı 14\'ten büyük olduğu için kitap ödünç alamaz.';
    END IF;
END //

DELIMITER ;
