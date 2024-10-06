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

function tampilkanOutput() {
    let sensorMerak = new SensorPasut("Selat Sunda", "Merak");
    tampilkanOutputDiConsoleDanHTML(sensorMerak.aktifkan(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.getStatus(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.nonaktifkan(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.getStatus(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.cekLatihanKapal(), 'sensorOutput');
    tampilkanOutputDiConsoleDanHTML(sensorMerak.cekKondisiCuaca("Cerah"), 'sensorOutput');

    let ferryKapal = new InfoTiket("Ferry Express", "Penumpang", 500, 100, 30, 200);
    tampilkanOutputDiConsoleDanHTML(ferryKapal.infoKapal(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.beliTiket(50), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.beliTiket(160), 'kapalOutput');
    tampilkanOutputDiConsoleDanHTML(ferryKapal.cekTiketTersedia(), 'kapalOutput');
}

window.onload = tampilkanOutput;
