class SensorPasut {
    #status;

    constructor(nama, lokasi) {
        this.nama = nama;
        this.lokasi = lokasi;
        this.#status = "Mati";
    }

    aktifkan() {
        this.#status = "Aktif";
        return `Sensor ${this.nama} di ${this.lokasi} telah diaktifkan.`;
    }

    nonaktifkan() {
        this.#status = "Mati";
        return `Sensor ${this.nama} di ${this.lokasi} telah dimatikan/dinonaktifkan.`;
    }

    getStatus() {
        return `Status sensor ${this.nama} di ${this.lokasi} saat ini adalah ${this.#status}.`;
    }
}

// Contoh penggunaan
let sensorMerak = new SensorPasut("Selat Sunda", "Merak");

console.log(sensorMerak.aktifkan());
console.log(sensorMerak.getStatus());
console.log(sensorMerak.nonaktifkan());
console.log(sensorMerak.getStatus());
