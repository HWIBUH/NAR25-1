CREATE TABLE subco(
    subco_id INT(4) PRIMARY KEY AUTO_INCREMENT,
    subco_pertanyaan VARCHAR(255),
    subco_jawaban VARCHAR(2000)
)

INSERT INTO subco(subco_id, subco_pertanyaan, subco_jawaban) VALUES
(1, 'Apa itu jaringan komputer? Jelaskan komponen-komponen yang dibutuhkan dalam membentuk suatu jaringan komputer!', 'Jaringan komputer adalah kumpulan perangkat komputer yang terhubung dan dapat bertukar data dan berbagi sumber daya.
Komponen-komponen yang dibutuhkan dalam membentuk suatu jaringan komputer adalah:
NIC (Network Interface Card): berfungsi untuk menyambung perangkat komputer ke komputer lainnya. Tiap NIC mempunyai MAC Address (unik) yang dipasang di network card chip oleh IEEE, dan disimpan di PROM (Programmable read-only memory). NIC ada dua tipe, wireless (antenna) dan wired (ada di motherboard). 
Hub: perangkat yang membagikan koneksi jaringan ke beberapa perangkat. Hub akan menyiarkan permintaan ini ke seluruh jaringan. Semua perangkat akan memeriksa apakah permintaan tersebut milik mereka atau bukan. Jika bukan milik mereka, permintaan tersebut akan dibatalkan.
Switch adalah perangkat keras yang menghubungkan beberapa perangkat pada jaringan komputer. Switch memiliki fitur yang lebih canggih daripada Hub yaitu switch bisa validasi tujuan mana yang akan dituju. Switch memiliki tabel terbaru yang menentukan kemana data akan dikirim atau tidak. Switch mengirimkan pesan ke tujuan yang benar berdasarkan physical address. Oleh karena itu, kita dapat mengatakan bahwa switch menyediakan koneksi langsung antara sumber dan tujuan. Switch meningkatkan kecepatan jaringan
Router: Perangkat yang menghubungkan suatu jaringan lokal ke jaringan eksternal(antar jaringan), mengarahkan lalu lintas jaringan
Modem: Menghubungkan komputer ke penyedia layanan internet (ISP)
Kabel jaringan: Media untuk menghubungkan perangkat satu sama lain
Server: Menyimpan informasi dan mengelola jaringan komputer
Bridge: Meneruskan lalu lintas antara segmen jaringan dan membagi jaringan besar menjadi beberapa jaringan kecil
Repeater: Memperkuat dan meregenerasi jaringan dan sinyal yang masuk
'),
(2, 'Bagaimana topologi jaringan mempengaruhi performa dan keamanan jaringan komputer? Jelaskan berbagai jenis topologi yang umum digunakan!', 'Topologi jaringan, susunan elemen dalam jaringan komputer, secara signifikan mempengaruhi profil keamanannya. Misalnya, semua perangkat berbagi jalur komunikasi dalam topologi bus, yang memungkinkan penyadapan. Sebaliknya, topologi bintang memiliki simpul pusat yang, jika terganggu, dapat melumpuhkan seluruh jaringan.
 
Topologi jaringan mempengaruhi performa jaringan komputer melalui beberapa aspek kunci. Pertama, kecepatan transfer data dan latensi bervariasi; topologi bintang lebih cepat karena perangkat terhubung langsung ke switch, sedangkan topologi bus dapat mengalami latensi lebih tinggi karena berbagi satu saluran. Risiko bottleneck juga berbeda; jika switch pusat pada topologi bintang gagal, seluruh jaringan terputus, sementara topologi mesh memiliki banyak jalur untuk mengurangi risiko tersebut.

Skalabilitas menjadi faktor penting, di mana topologi bintang lebih mudah diskalakan tanpa mempengaruhi perangkat lain, sedangkan topologi bus sulit diskalakan karena memerlukan pemutusan jaringan (Skalabilitas adalah menambah perangkat baru). Selain itu, jumlah perangkat dapat mempengaruhi performa; topologi bus lebih rentan terhadap tabrakan data, sedangkan topologi mesh lebih baik dalam mengelola lalu lintas. Terakhir, keandalan jaringan juga dipengaruhi; kegagalan switch pusat pada topologi bintang dapat memutus jaringan, sedangkan topologi mesh lebih tahan terhadap kegagalan. Memilih topologi yang tepat sangat penting untuk memastikan kecepatan, latensi, dan keandalan yang optimal.
 
Topologi Star:

Semua perangkat terhubung ke satu titik pusat (hub atau switch).
Kelebihan: Mudah untuk menambah perangkat baru, isolasi yang baik, dan mudah untuk mengidentifikasi masalah.
Kekurangan: Jika titik pusat gagal, seluruh jaringan akan terputus.

Topologi Bus:

Semua perangkat terhubung ke satu kabel utama (bus).
Kelebihan: Biaya rendah dan mudah untuk diimplementasikan.
Kekurangan: Jika kabel utama gagal, seluruh jaringan akan terputus, dan performa dapat menurun seiring bertambahnya perangkat.

Topologi Ring:

Setiap perangkat terhubung ke dua perangkat lainnya, membentuk lingkaran.
Kelebihan: Data mengalir dalam satu arah, mengurangi kemungkinan tabrakan data.
Kekurangan: Jika satu perangkat gagal, seluruh jaringan dapat terputus.

Topologi Mesh:

Setiap perangkat terhubung ke beberapa perangkat lainnya, menciptakan banyak jalur untuk data.
Kelebihan: Sangat tahan terhadap kegagalan, performa tinggi, dan isolasi yang baik.
Kekurangan: Biaya tinggi dan kompleksitas dalam pengaturan.
Topologi Pohon (Tree):

Kombinasi dari topologi bintang dan bus, di mana beberapa perangkat terhubung ke switch yang terhubung ke kabel utama.
Kelebihan: Skalabilitas yang baik dan struktur hierarkis.
Kekurangan: Jika kabel utama gagal, seluruh cabang yang terhubung dapat terputus.

Topologi Peer-to-Peer:

Setiap perangkat berfungsi sebagai klien dan server, saling terhubung tanpa titik pusat.
Kelebihan: Mudah untuk diatur dan tidak memerlukan perangkat keras khusus.
Kekurangan: Keamanan dan manajemen yang lebih sulit, serta performa dapat menurun seiring bertambahnya perangkat.
'),
(3, "Jelaskan secara detail terkait OSI reference model dan lapisan yang dibahas dalam OSI reference model, juga hubungan model tersebut dengan jaringan komputer!", "OSI reference model (model referensi referensi jaringan terbuka) adalah sebuah model arsitektural jaringan yang dikembangkan oleh ISO (International Organization for Standardization). OSI adalah kerangka kerja konseptual yang membagi fungsi komunikasi jaringan menjadi tujuh lapisan, menyediakan kerangka logika terstruktur bagaimana proses komunikasi data berinteraksi melalui jaringan. OSI berupaya membentuk standar umum jaringan komputer untuk menunjang interoperabilitas (tuker-tukeran tanpa collision? Kek beda device/model apalah tp bisa tukeran informasi). 
Lapisan OSI:
Physical Layer → mendefinisikan media transmisi jaringan, sinkronisasi bit, arsitektur jaringan (seperti Ethernet), topologi jaringan dan pengkabelan. Mendefinisikan bagaimana Network Interface Card (NIC) dapat berinteraksi dengan media kabel atau radio. Data biner dikodekan dalam bentuk yang dapat ditransmisi melalui media jaringan
Data-link Layer → untuk menentukan bagaimana bit-bit data dikelompokkan menjadi format yang disebut sebagai frame. Selain itu, pada level ini terjadi koreksi kesalahan, flow control, pengalamatan perangkat keras (MAC Address). Fungsi lapisan MAC adalah mengkoordinasikan akses langsung terhadap lapisan fisik dengan tergantung metode media access controlnya:
Carrier Sense Multiple Access with Collision Detection (CSMA/CD) → memastikan bahwa jaringan sedang tidak dipakai untuk transfer dari dan oleh node lainnya
Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) → melakukan analisa kondisi jaringan untuk menghindari collisions, beda sama CSMA/CD yang memakai pengaturan transmisi jaringan 
Network Layer → mendefinisikan alamat-alamat IP dan menyediakan fungsi routing sehingga paket dapat dikirim keluar dari segment network lokal ke suatu tujuan yang berada pada suatu network lain. (IP)
Transport Layer → memecah data ke dalam paket-paket data serta memberikan nomor urut ke paket-paket tersebut sehingga dapat disusun kembali pada sisi tujuan setelah diterima. Layer ini menyediakan transfer yang reliable dan transparan antara kedua titik akhir, layer ini juga menyediakan multiplexing, kendali aliran dan pemeriksaan error serta memperbaikinya.
Session Layer → Untuk mendefinisikan bagaimana koneksi dapat dimulai, dipelihara, atau diakhiri.
Presentation Layer → mentranslasikan data yang hendak ditransmisikan oleh aplikasi ke dalam format yang dapat ditransmisikan melalui jaringan. (redirector software, workstation, network shell, Remote Desktop Protocol (RDP))
Application Layer → Sebagai antarmuka dengan aplikasi dengan fungsionalitas jaringan, mengatur bagaimana aplikasi dapat mengakses jaringan, dan kemudian membuat pesan-pesan kesalahan. (HTTP, FTP, SMTP, dan NFS).
Hubungan model dengan komputer → OSI memfasilitasi sebuah komunikasi jaringan, memungkinkan dua sistem (beda os, beda model, etc pokoe mandiri) berkomunikasi melalui protokol atau antarmuka yang distandarisasi.
"),
(4, "Jelaskan perbedaan antara network address dan broadcast address beserta kegunaannya!", "Network Address
Pengertian
Adalah address paling pertama dalam suatu subnet. Digunakan untuk mengidentifikasi jaringan. Address ini tidak bisa digunakan untuk device apapun sebagai IP address karena digunakan untuk mendefinisikan jaringan.
Format Penulisan
Semua bit host pada alamat IP diatur ke 0
Contoh pada subnet 192.168.1.0 /24 maka network addressnya 192.168.1.0
Contoh(2) pada subnet 192.168.1.192 /26 maka network addressnya 192.168.1.192
Fungsi
Mengidentifikasi atau merepresentasikan jaringan tertentu dalam dokumentasi atau pengaturan jaringan.
Digunakan oleh router dan perangkat jaringan lain untuk routing dan pembagian segmen jaringan.


Broadcast Address
Pengertian
Adalah address paling akhir dalam suatu subnet. Digunakan untuk mengirim pesan ke semua perangkat dalam jaringan tersebut. Dengan kata lain, semua perangkat yang berada dalam subnet akan menerima paket yang dikirim ke broadcast address.
Format Penulisan
Semua bit host isinya 1
Contoh pada subnet 192.168.1.192 /24 maka network addressnya 192.168.1.255
Fungsi
Digunakan untuk komunikasi ke semua perangkat dalam satu jaringan tanpa perlu menyebutkan alamat IP setiap perangkat.
Bermanfaat untuk mengirim pesan seperti permintaan ARP (Address Resolution Protocol) atau update routing.
"),
(5, "Jelaskan bagaimana cara router dan switch menentukan tujuan pengiriman data!", "Switch itu punya yang namanya tabel MAC (Media Access Control). Isinya tuh frame data atau format pengiriman data (port target, port asal, data). Kalau ada port ngirim data, ntar dicek alamat mac tujuannya ada atau ngga, kalo ada ya dikirim kalo ngga ada dia bakal kirim ke semua port.
Router itu punya namanya tabel routing isinya pasangan IP address dengan jalur terbaik pengiriman. Cara nentuin targetnya tuh cari tujuan akhir terus hitung jalur terbaik nya baru dikirim. Kalau tujuan ga ketemu, bakal didrop/dikirim ke default router terus dikasih alert (ICMP)

"),
(6, "Apa itu network protocol dalam jaringan komputer? Sebutkan contoh protocol dan jelaskan apa yang diatur dalam protocol tersebut beserta cara kerjanya, minimal 3!", " Network protocol adalah sistem yang memungkinkan hubungan komunikasi serta perpindahan data dari komputer ke network. Pada protocol, terdapat aturan-aturan yang harus diikuti agar komunikasi antara sender dan receiver dapat berjalan dengan baik. 
UDP(User Datagram Protocol)
UDP adalah protocol  internet yang biasa digunakan untuk transmisi yang time sensitive seperti pemutaran video. UDP langsung mengirimkan packets ke dalam komputer tanpa membangun koneksi terlebih dahulu. UDP tidak memiliki sistem packet reordering jadi sangat mungkin packet itu hilang ketika dikirim. 
TCP(Transmission Control Protocol)
TCP adalah protokol komunikasi yang memastikan pertukaran data antar perangkat melalui jaringan komputer berjalan dengan lancar.TCP ada diantara lapisan Application dan Network Layer, Protocol ini biasa digunakan untuk pengiriman pesan seperti email, chatting.TCP membangun koneksi antara sender dan receiver yaitu handshake. Sender dan receiver saling mengirim sinyal SYN, SYN-ACK, ACK untuk membangun koneksi. Jika packet hilang TCP ada sistem packet reordering untuk mengirim ulang packet yang hilang. Jika semua data sudah terkirim koneksi akan ditutup dengan four way handshake. 
DHCP (Dynamic Host Configuration Protocol)
DHCP adalah sebuah protocol yang mengassign IP address secara otomatis kepada perangkat yang ada di jaringan. DHCP juga mengassign detail konfigurasi lainnya seperti DNS address, Subnet Mask, dan default gateway secara otomatis. DHCP mulai dari proses Discover, dimana client host akan mengirim kan message ( kepada setiap device di network untuk mencari DHCP server.
")
