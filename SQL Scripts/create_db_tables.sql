DROP DATABASE IF EXISTS ProjeKutuphane;
CREATE DATABASE	ProjeKutuphane;
USE ProjeKutuphane;

CREATE TABLE Kaynak(
	KaynakID INT NOT NULL AUTO_INCREMENT,
	KaynakAdi VARCHAR(30) NOT NULL,
	KaynakCikisYili YEAR,
	StokSayisi INT NOT NULL,
	IadeEdilmesiGerekenMaxSure INT NOT NULL,  -- gun sayisi
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
	OzellestigiAlan VARCHAR(50) NOT NULL,
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
	CezaPuani INT NOT NULL,
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

CREATE TABLE Yonetici(
	YoneticiID INT NOT NULL AUTO_INCREMENT,
	Ad VARCHAR(30) NOT NULL,
	Soyad VARCHAR(30) NOT NULL,
	Email VARCHAR(100) NOT NULL UNIQUE,
	Sifre VARCHAR(255) NOT NULL,
	Telefon VARCHAR(15) UNIQUE UNIQUE,
	Adres VARCHAR(255),
	PRIMARY KEY(YoneticiID)
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
	IadeEdilmesiGerekenTarih DATE NOT NULL,
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
	YoneticiID NOT NULL,
	IstatistikID NOT NULL,
	PRIMARY KEY(YoneticiID, IstatistikID),
	FOREIGN KEY(YoneticiID) REFERENCES Yonetici(YoneticiID),
	FOREIGN KEY(IstatistikID) REFERENCES Istatistik(IstatistikID)
);
