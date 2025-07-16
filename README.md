# KupujemProdajem - Klon (Frontend)

Ovo je frontend dio aplikacije koja predstavlja klon popularnog web sajta za postavljanje oglasa. Aplikacija je razvijena koristeći **Angular** i služi kao platforma za pregled, postavljanje i upravljanje oglasima.

## ✨ Mogućnosti

* **Prikaz oglasa**: Početna stranica prikazuje sve aktivne oglase sa paginacijom.
* **Detalji o oglasu**: Klikom na oglas otvara se stranica sa detaljnim informacijama, uključujući opis, cijenu, datum objave i kontakt informacije prodavca.
* **Autentifikacija korisnika**: Implementiran je kompletan sistem za registraciju i prijavu korisnika koristeći **JWT (JSON Web Tokens)**.
* **Zaštita ruta**: Rutama za kreiranje i izmjenu oglasa mogu pristupiti samo prijavljeni korisnici (`AuthGuard`), dok stranicama za prijavu i registraciju mogu pristupiti samo gosti (`GuestGuard`).
* **Upravljanje oglasima (CRUD)**:
  * **Kreiranje**: Prijavljeni korisnici mogu postaviti nove oglase putem forme koja uključuje otpremanje slike.
  * **Izmjena**: Korisnici mogu mijenjati informacije na svojim oglasima.
  * **Brisanje**: Korisnici mogu trajno obrisati svoje oglase.
* **Responzivan dizajn**: Aplikacija je stilizovana pomoću **Bootstrap 5** biblioteke i prilagođena je za prikaz na različitim uređajima.

## 🛠️ Tehnologije

* **Angular**
* **TypeScript**
* **Bootstrap 5** i **Bootstrap Icons** za stilizovanje i ikonice
* **RxJS** za reaktivno programiranje i upravljanje asinhronim podacima
* **Angular Router** za navigaciju unutar aplikacije
* **Angular Reactive Forms** za upravljanje formama i validaciju
* **jwt-decode** za rad sa JSON Web Tokenima na klijentskoj strani

## 🚀 Pokretanje projekta

Da biste pokrenuli projekat lokalno, pratite sljedeće korake:

1.  **Klonirajte repozitorijum:**
    ```bash
    git clone [https://github.com/mihailocv/kpc-webshop-frontend](https://github.com/mihailocv/kpc-webshop-frontend)
    cd vas-repozitorijum
    ```

2.  **Instalirajte zavisnosti (dependencies):**
    ```bash
    npm install
    ```

3.  **Podesite API adresu:**
    Aplikacija očekuje backend server na adresi `http://localhost:3000`. Ovu adresu možete promijeniti u datoteci `src/environments/environment.ts`.
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000' // Izmijenite po potrebi
    };
    ```

4.  **Pokrenite razvojni server:**
    Komanda `ng serve` pokreće server na adresi `http://localhost:4200/`. Aplikacija će se automatski osvježiti nakon svake izmjene u kodu.
    ```bash
    ng serve
    ```

## 📜 Dostupne skripte

U `package.json` datoteci, dostupne su sljedeće skripte:

* `"start": "ng serve"`: Pokreće aplikaciju u razvojnom režimu.
* `"build": "ng build"`: Kompajlira aplikaciju za produkcijsku upotrebu. Artefakti se smještaju u `dist/` direktorijum.
* `"watch": "ng build --watch --configuration development"`: Kompajlira aplikaciju u režimu praćenja izmjena.
* `"test": "ng test"`: Pokreće unit testove koristeći Karma test runner.
