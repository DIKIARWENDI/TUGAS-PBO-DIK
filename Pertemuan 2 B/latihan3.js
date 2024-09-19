function createForm() {
    const diki = document.getElementById('diki');
    diki.style.backgroundColor = "rgba(237, 231, 246, 0.8)";
    diki.style.borderRadius = "16px";
    diki.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
    diki.style.padding = "25px";
    diki.style.maxWidth = "650px";
    diki.style.margin = "30px auto";
    
    // Judul
    const title = document.createElement('h2');
    title.textContent = 'INPUT DATA CALON ANGGOTA AKMAPALA';
    title.style.textAlign = 'center';
    title.style.color = '#4a148c';
    title.style.marginBottom = '20px';
    diki.appendChild(title);

    // Form
    const form = document.createElement('div');
    form.style.display = "grid";
    form.style.gridTemplateColumns = "1fr";
    form.style.rowGap = "15px";

    form.innerHTML = `
        <div style="display: flex; flex-direction: column;">
            <label for="no" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">No:</label>
            <input type="number" id="no" name="no" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Nomor" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="nama" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">Nama:</label>
            <input type="text" id="nama" name="nama" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Nama" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="nim" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">NIM:</label>
            <input type="text" id="nim" name="nim" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan NIM" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="prodi" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">Prodi:</label>
            <input type="text" id="prodi" name="prodi" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Prodi" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="kelas" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">Kelas:</label>
            <input type="text" id="kelas" name="kelas" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Kelas" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="hobi" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">Hobi:</label>
            <input type="text" id="hobi" name="hobi" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Hobi" required>
        </div>

        <div style="display: flex; flex-direction: column;">
            <label for="alamat" style="font-weight: bold; color: #4a148c; margin-bottom: 5px;">Alamat:</label>
            <input type="text" id="alamat" name="alamat" style="padding: 12px; border: 2px solid #6a1b9a; border-radius: 8px;" placeholder="Masukkan Alamat" required>
        </div>

        <button id="submitBtn" type="button" style="padding: 15px; background-color: #6a1b9a; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold; transition: background-color 0.3s, transform 0.2s;">Submit</button>
        <hr style="border-color: #6a1b9a;">
    `;

    diki.appendChild(form);

    // Modal untuk konfirmasi berhasil
    const modal = document.createElement('div');
    modal.id = "successModal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h3>Data berhasil diterima!</h3>
            <button id="closeModal" style="padding: 10px 20px; background-color: #6a1b9a; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Tabel untuk menampilkan data yang diinput
    const tableContainer = document.createElement('div');
    tableContainer.innerHTML = `
        <h3 style="text-align: center; color: #4a148c; margin-top: 20px;">Data Anggota yang Telah Diinput</h3>
        <table id="dataTable" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr style="background-color: #6a1b9a; color: white;">
                    <th style="padding: 10px; border: 1px solid #ddd;">No</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Nama</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">NIM</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Prodi</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Kelas</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Hobi</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Alamat</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;
    diki.appendChild(tableContainer);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', () => {
        const no = document.getElementById('no').value;
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const prodi = document.getElementById('prodi').value;
        const kelas = document.getElementById('kelas').value;
        const hobi = document.getElementById('hobi').value;
        const alamat = document.getElementById('alamat').value;

        if (no && nama && nim && prodi && kelas && hobi && alamat) {
            // Reset form setelah submit
            document.getElementById('no').value = '';
            document.getElementById('nama').value = '';
            document.getElementById('nim').value = '';
            document.getElementById('prodi').value = '';
            document.getElementById('kelas').value = '';
            document.getElementById('hobi').value = '';
            document.getElementById('alamat').value = '';

            // Tambahkan data ke tabel
            const tableBody = document.querySelector('#dataTable tbody');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 10px; border: 1px solid #ddd;">${no}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${nama}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${nim}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${prodi}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${kelas}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${hobi}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${alamat}</td>
            `;
            tableBody.appendChild(row);

            // Tampilkan modal sukses
            modal.style.display = "flex";
        } else {
            alert('Silakan isi semua kolom!');
        }
    });
}

createForm();
