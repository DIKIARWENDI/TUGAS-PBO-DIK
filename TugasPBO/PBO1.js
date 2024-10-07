function tampilkanOutputDiConsoleDanHTML(output, elemenID) {
    console.log(output);
    document.getElementById(elemenID).innerHTML += `<p>${output}</p>`;
}

class SensorPasut {
    constructor(nama, lokasi) {
        this.nama = nama;
        this.lokasi = lokasi;
        this._status = "Nonaktif"; 
    }

    aktifkan() {
        this._status = "Aktif";
        return `Sensor ${this.nama} di ${this.lokasi} telah diaktifkan.`;
    }

    nonaktifkan() {
        this._status = "Nonaktif";
        return `Sensor ${this.nama} di ${this.lokasi} telah dinonaktifkan/dimatikan.`;
    }

    getStatus() {
        return `Status Sensor ${this.nama} di ${this.lokasi} sedang ${this._status}.`;
    }

    cekLatihanKapal() {
        return `Latihan kapal sedang berlangsung di sekitar lokasi sensor ${this.nama}.`;
    }

    cekKondisiCuaca(cuaca) {
        return `Kondisi cuaca di ${this.lokasi} adalah ${cuaca}.`;
    }
}

class SensorKapal extends SensorPasut {
    constructor(nama, lokasi, tipeSensor) {
        super(nama, lokasi);
        this.tipeSensor = tipeSensor;
    }

    cekLatihanKapal() {
        return `Sensor ${this.nama} (${this.tipeSensor}) mendeteksi bahwa latihan kapal berlangsung di ${this.lokasi}.`;
    }

    cekKecepatanAngin(kecepatan) {
        return `Kecepatan angin di ${this.lokasi} terdeteksi oleh sensor ${this.nama} sebesar ${kecepatan} km/h.`;
    }
}

class Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar) {
        this.nama = nama;
        this.jenis = jenis;
        this.kapasitas = kapasitas;
        this.panjang = panjang;
        this.lebar = lebar;
    }

    infoKapal() {
        return `Kapal ${this.nama} berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} orang, memiliki panjang ${this.panjang} meter dan lebar ${this.lebar} meter.`;
    }
}

class KapalPerang extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, senjata) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.senjata = senjata;
    }

    infoKapal() {
        return `Kapal perang ${this.nama} berjenis ${this.jenis}, memiliki panjang ${this.panjang} meter, lebar ${this.lebar} meter, dan dilengkapi dengan senjata: ${this.senjata}.`;
    }
}

class KapalKargo extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, muatanMaksimum) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.muatanMaksimum = muatanMaksimum;
    }

    infoKapal() {
        return `Kapal kargo ${this.nama} berjenis ${this.jenis}, dengan kapasitas ${this.kapasitas} orang, panjang ${this.panjang} meter, lebar ${this.lebar} meter, dan mampu membawa muatan maksimal ${this.muatanMaksimum} ton.`;
    }
}

class KapalPenumpangVIP extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, fasilitas) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.fasilitas = fasilitas;
    }

    infoKapal() {
        return `Kapal ${this.nama} berjenis ${this.jenis} dengan kapasitas ${this.kapasitas} orang, panjang ${this.panjang} meter, dan lebar ${this.lebar} meter. Kapal ini dilengkapi fasilitas VIP seperti: ${this.fasilitas}.`;
    }
}

class SensorCuaca extends SensorPasut {
    constructor(nama, lokasi, tipeSensor) {
        super(nama, lokasi);
        this.tipeSensor = tipeSensor;
    }

    cekKondisiCuaca(cuaca) {
        return `Sensor ${this.nama} (${this.tipeSensor}) di ${this.lokasi} melaporkan kondisi cuaca saat ini adalah ${cuaca}.`;
    }

    cekTekananUdara(pressure) {
        return `Tekanan udara di ${this.lokasi} terdeteksi oleh sensor ${this.nama} sebesar ${pressure} hPa.`;
    }
}

class InfoTiket extends Kapal {
    constructor(nama, jenis, kapasitas, panjang, lebar, jumlahTiket) {
        super(nama, jenis, kapasitas, panjang, lebar);
        this.jumlahTiket = jumlahTiket;
        this.tiketAwal = jumlahTiket;
    }

    cekTiketTersedia() {
        return `Jumlah tiket tersedia dari ${this.tiketAwal} tiket adalah ${this.jumlahTiket}.`;
    }

    beliTiket(jumlah) {
        if (this.jumlahTiket >= jumlah) {
            this.jumlahTiket -= jumlah;
            return `${jumlah} tiket berhasil dibeli. Tiket tersisa: ${this.jumlahTiket}.`;
        } else {
            return `Jumlah tiket tidak mencukupi. Anda ingin membeli ${jumlah} tiket, namun hanya tersisa ${this.jumlahTiket} tiket.`;
        }
    }
}

// Implementasi fungsi utama untuk menampilkan hasil
function tampilkanOutput() {
    let sensorMerak = new SensorPasut("Selat Sunda", "Merak");
    tampilkanOutputDiConsoleDanHTML(sensorMerak.aktifkan(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.getStatus(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.nonaktifkan(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.getStatus(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.cekLatihanKapal(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.cekKondisiCuaca("Cerah"), 'sensorOutput');

    let sensorKapal = new SensorKapal("Pelabuhan Tanjung Priok", "Jakarta", "Radar");
    tampilkanOutputDiConsoleDanHTML(sensorKapal.aktifkan(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorKapal.cekLatihanKapal(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorKapal.cekKecepatanAngin(20), 'sensorOutput');

    let kapalPerang = new KapalPerang("KRI Bima", "Perang", 150, 120, 20, "Meriam, Rudal");
    tampilkanOutputDiConsoleDanHTML(kapalPerang.infoKapal(), 'kapalOutput');

    let kapalKargo = new KapalKargo("Kargo Nusantara", "Kargo", 30, 200, 50, 10000);
    tampilkanOutputDiConsoleDanHTML(kapalKargo.infoKapal(), 'kapalOutput');

    let kapalVIP = new KapalPenumpangVIP("Royal Ferry", "Penumpang VIP", 100, 110, 25, "Restoran, Kolam Renang, Spa");
    tampilkanOutputDiConsoleDanHTML(kapalVIP.infoKapal(), 'kapalOutput');

    let sensorCuaca = new SensorCuaca("Stasiun Meteorologi", "Pelabuhan Benoa", "Barometer");
    tampilkanOutputDiConsoleDanHTML(sensorCuaca.cekKondisiCuaca("Berawan"), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorCuaca.cekTekananUdara(1013), 'sensorOutput');

    let ferryKapal = new InfoTiket("Ferry Express", "Penumpang", 500, 100, 30, 200);
    tampilkanOutputDiConsoleDanHTML(ferryKapal.infoKapal(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.beliTiket(50), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.beliTiket(160), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
}

window.onload = tampilkanOutput;
