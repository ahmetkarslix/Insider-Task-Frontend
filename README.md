
# Horse Racing

Bu proje, Vue.js ve Vuex kullanarak geliştirilmiş bir At Yarışı uygulamasıdır. Uygulama, rastgele oluşturulan atlar ve yarış programları ile birden fazla turdan oluşan yarışlar düzenlemenize olanak tanır. Ayrıca, yarış sonuçlarını ve atların performanslarını takip edebilirsiniz.

## Uygulama Videosu 

Uygulamanın çalışır hali, güncel çalıştırılan makine üstünde bir video çekilmiştir.

[Uygulama Videosu](https://www.youtube.com/watch?v=U9o_o5wVsD0)

## Kurulum ve Başlatma

### Gereksinimler

- Node.js (v12+)
- Vue.js (v3)
- npm veya yarn

### Kurulum

Proje dosyalarını klonlayın:

```bash
git clone https://github.com/ahmetkarslix/Insider-Task-Frontend.git
cd Insider-Task-Frontend
```

Gerekli bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

### Başlatma

Uygulamayı başlatmak için aşağıdaki komutu kullanın:

```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Proje Yapısı

```plaintext
insidertask/
│
├── src/
│   ├── components/
│   │   ├── Home.vue
│   │   ├── HorseList.vue
│   │   ├── Program.vue
│   │   ├── RaceTrack.vue
│   │   └── Results.vue
│   ├── store/
│   │   ├── mutation-types.js
│   │   ├── store.js
│   │   └── tests/
│   │       └── store.test.js
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── README.md
└── package.json
```

### Bileşenler

- `HorseList.vue`: Tüm atların listesini gösterir.
- `Program.vue`: Her tur için yarış programını gösterir.
- `RaceTrack.vue`: Yarış pistini ve atların konumlarını gösterir.
- `Results.vue`: Her turun sonuçlarını gösterir.

### Store (Vuex)

- `store.js`: Uygulama durumunu ve işlemlerini yönetir.
- `mutation-types.js`: Mutasyon ve aksiyon türlerini tanımlar.

## Uygulama Fonksiyonları

### At Oluşturma

`generateRandomName` ve `generateRandomColor` fonksiyonları, rastgele at isimleri ve renkleri oluşturur. `generateHorses` aksiyonu, 20 atlık bir liste oluşturur ve Horse List'e  kaydeder.

### Yarış Programı Oluşturma

`generateProgram` aksiyonu, her tur için rastgele 10 attan oluşan yarış programları oluşturur ve Program kısmına ekler.

### Yarış Başlatma ve Duraklatma

`startRace` ve `pauseRace` aksiyonları, yarışı başlatır ve duraklatır. `runRace` aksiyonu, her tur için atların pozisyonlarını günceller ve bitiş zamanlarını hesaplar.

### Durum Güncellemeleri

- `SET_HORSES`: Atları duruma kaydeder.
- `ADD_PROGRAM`: Yarış programını duruma ekler.
- `ADD_RESULTS`: Yarış sonuçlarını duruma ekler.
- `UPDATE_HORSE_POSITION`: Atların pozisyonlarını günceller.
- `UPDATE_HORSE_CONDITIONS`: Atların kondisyonlarını günceller.

## Testler

Proje, Jest kullanılarak yazılmış bir dizi unit testi içerir. Testler, Vuex store fonksiyonlarının doğru çalıştığını doğrular.

### Test Çalıştırma

Aşağıdaki komutu kullanarak testleri çalıştırabilirsiniz:

```bash
npm run test
# veya
yarn test
```

### Test Sonuçları

```plaintext
 PASS  src/store/tests/store.test.js
  Vuex Store Tests
    ✓ lengthToPixel should calculate pixel length correctly (1 ms)
    ✓ SET_HORSES mutation should set the horses state (2 ms)
    ✓ GENERATE_HORSES action should generate horses correctly (2 ms)
    ✓ NEXT_LAP mutation should advance the race to the next lap (1 ms)
    ✓ UPDATE_HORSE_CONDITIONS mutation should update horses conditions (1 ms)

--------------------|---------|----------|---------|---------|------------------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s            
--------------------|---------|----------|---------|---------|------------------------------
All files           |   29.41 |        0 |   18.42 |    30.1 |                              
 src                |       0 |      100 |     100 |       0 |                              
  main.js           |       0 |      100 |     100 |       0 | 6                            
 src/store          |    29.7 |        0 |   18.42 |   30.43 |                              
  mutation-types.js |     100 |      100 |     100 |     100 |                              
  store.js          |   28.28 |        0 |   18.42 |   28.88 | 58-70,78-105,111-134,159-212 
--------------------|---------|----------|---------|---------|------------------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.415 s
```

