const sik = {
    kelas : "B",
    angkatan : "2023",
    walidosen : "willdan"
}

console.log(sik.kelas);
console.log(sik.angkatan);
console.log(sik.walidosen);

const siKel = {}

siKel.atribut1 ="contoh atribut 1"
siKel.atribut2 ="contoh atribut 2"
siKel.atribut3 ="contoh atribut 3"

console.log(siKel.atribut1)

delete siKel.atribut2;

let orang ={
    nama : "Diki",
    pekerjaan : "wiraswasta",
    kendaraan : {
        mobil : "fortuner",
        motor : "kawasaki H2R",
        pesawat : "Boeing",
        mobil2 : "Ferrari",
    }
}

console.log(orang.kendaraan.mobil)

let tampil = "Nama saya" + orang.nama+ " Saya bekerja sebagai" + orang.pekerjaan + "sehari-hari saya terbiasa menggunakan pesawat pribadi dengan jenis" + orang.kendaraan.pesawat

document.getElementById("object").innerHTML = tampil

let mahasiswa ={
    namaDepan: "Diki",
    namabelakang : "Arwendi",
    NamaLengkap : function(){
        return this.namaDepan + " " + this.namabelakang
    }
}

let tampilmhs = "nama saya" + mahasiswa.namaDepan + ", nama lengkap saya adalah " + mahasiswa.namaLengkap()

document.getElementById("objek").innerHTML = tampilmhs

function mahasiswaSIK(nama, kelas, angkatan){
    this.nama = nama,
    this.kelas = kelas,
    this.NamaLengkap = angkatan
}