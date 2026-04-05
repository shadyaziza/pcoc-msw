// src/index.ts
import { setupWorker } from "msw/browser";

// src/handlers/auth.ts
import { http, HttpResponse, delay } from "msw";
function checkAuth(body) {
  if (body.email !== "admin@pcoc.com" || body.password !== "password123") {
    return false;
  }
  return true;
}
var authHandler = http.post("*/api/auth/login", async ({ request }) => {
  const { email, password } = await request.json();
  await delay();
  if (!checkAuth({ email, password })) {
    return HttpResponse.json(
      {
        error: "wrong credentials"
      },
      { status: 401 }
    );
  }
  return HttpResponse.json(
    {
      token: "fake-token",
      user: {
        id: "fake-id",
        role: "admin",
        name: email,
        email
      }
    },
    { status: 200 }
  );
});
var authHandlers = [authHandler];

// src/handlers/cities.ts
import { delay as delay2, http as http2, HttpResponse as HttpResponse2 } from "msw";

// src/data/countries.json
var countries_default = [
  {
    code: "qa",
    name: {
      en: "Qatar",
      ar: "\u0642\u0637\u0631"
    },
    phonePrefix: "+974",
    phoneLength: 11,
    flag: "/flags/qa.png"
  },
  {
    code: "eg",
    name: {
      en: "Egypt",
      ar: "\u0645\u0635\u0631"
    },
    phonePrefix: "+20",
    phoneLength: 12,
    flag: "/flags/eg.png"
  },
  {
    code: "pl",
    name: {
      en: "Poland",
      ar: "\u0628\u0648\u0644\u0646\u062F\u0627"
    },
    phonePrefix: "+48",
    phoneLength: 11,
    flag: "/flags/pl.png"
  },
  {
    code: "lb",
    name: {
      en: "Lebanon",
      ar: "\u0644\u0628\u0646\u0627\u0646"
    },
    phonePrefix: "+961",
    phoneLength: 11,
    flag: "/flags/lb.png"
  },
  {
    code: "sd",
    name: {
      en: "Sudan",
      ar: "\u0627\u0644\u0633\u0648\u062F\u0627\u0646"
    },
    phonePrefix: "+249",
    phoneLength: 12,
    flag: "/flags/sd.png"
  },
  {
    code: "us",
    name: {
      en: "United States",
      ar: "\u0627\u0644\u0648\u0644\u0627\u064A\u0627\u062A \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
    },
    phonePrefix: "+1",
    phoneLength: 11,
    flag: "/flags/us.png"
  },
  {
    code: "gb",
    name: {
      en: "United Kingdom",
      ar: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
    },
    phonePrefix: "+44",
    phoneLength: 12,
    flag: "/flags/gb.png"
  },
  {
    code: "fr",
    name: {
      en: "France",
      ar: "\u0641\u0631\u0646\u0633\u0627"
    },
    phonePrefix: "+33",
    phoneLength: 11,
    flag: "/flags/fr.png"
  },
  {
    code: "de",
    name: {
      en: "Germany",
      ar: "\u0623\u0644\u0645\u0627\u0646\u064A\u0627"
    },
    phonePrefix: "+49",
    phoneLength: 13,
    flag: "/flags/de.png"
  },
  {
    code: "jp",
    name: {
      en: "Japan",
      ar: "\u0627\u0644\u064A\u0627\u0628\u0627\u0646"
    },
    phonePrefix: "+81",
    phoneLength: 12,
    flag: "/flags/jp.png"
  },
  {
    code: "cn",
    name: {
      en: "China",
      ar: "\u0627\u0644\u0635\u064A\u0646"
    },
    phonePrefix: "+86",
    phoneLength: 13,
    flag: "/flags/cn.png"
  },
  {
    code: "in",
    name: {
      en: "India",
      ar: "\u0627\u0644\u0647\u0646\u062F"
    },
    phonePrefix: "+91",
    phoneLength: 12,
    flag: "/flags/in.png"
  },
  {
    code: "au",
    name: {
      en: "Australia",
      ar: "\u0623\u0633\u062A\u0631\u0627\u0644\u064A\u0627"
    },
    phonePrefix: "+61",
    phoneLength: 11,
    flag: "/flags/au.png"
  },
  {
    code: "ca",
    name: {
      en: "Canada",
      ar: "\u0643\u0646\u062F\u0627"
    },
    phonePrefix: "+1",
    phoneLength: 11,
    flag: "/flags/ca.png"
  },
  {
    code: "mx",
    name: {
      en: "Mexico",
      ar: "\u0627\u0644\u0645\u0643\u0633\u064A\u0643"
    },
    phonePrefix: "+52",
    phoneLength: 12,
    flag: "/flags/mx.png"
  },
  {
    code: "br",
    name: {
      en: "Brazil",
      ar: "\u0627\u0644\u0628\u0631\u0627\u0632\u064A\u0644"
    },
    phonePrefix: "+55",
    phoneLength: 13,
    flag: "/flags/br.png"
  },
  {
    code: "za",
    name: {
      en: "South Africa",
      ar: "\u062C\u0646\u0648\u0628 \u0623\u0641\u0631\u064A\u0642\u064A\u0627"
    },
    phonePrefix: "+27",
    phoneLength: 11,
    flag: "/flags/za.png"
  },
  {
    code: "tr",
    name: {
      en: "Turkey",
      ar: "\u062A\u0631\u0643\u064A\u0627"
    },
    phonePrefix: "+90",
    phoneLength: 12,
    flag: "/flags/tr.png"
  },
  {
    code: "sa",
    name: {
      en: "Saudi Arabia",
      ar: "\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629"
    },
    phonePrefix: "+966",
    phoneLength: 12,
    flag: "/flags/sa.png"
  },
  {
    code: "ae",
    name: {
      en: "United Arab Emirates",
      ar: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u062D\u062F\u0629"
    },
    phonePrefix: "+971",
    phoneLength: 12,
    flag: "/flags/ae.png"
  },
  {
    code: "sg",
    name: {
      en: "Singapore",
      ar: "\u0633\u0646\u063A\u0627\u0641\u0648\u0631\u0629"
    },
    phonePrefix: "+65",
    phoneLength: 10,
    flag: "/flags/sg.png"
  },
  {
    code: "th",
    name: {
      en: "Thailand",
      ar: "\u062A\u0627\u064A\u0644\u0627\u0646\u062F"
    },
    phonePrefix: "+66",
    phoneLength: 11,
    flag: "/flags/th.png"
  },
  {
    code: "es",
    name: {
      en: "Spain",
      ar: "\u0625\u0633\u0628\u0627\u0646\u064A\u0627"
    },
    phonePrefix: "+34",
    phoneLength: 11,
    flag: "/flags/es.png"
  },
  {
    code: "it",
    name: {
      en: "Italy",
      ar: "\u0625\u064A\u0637\u0627\u0644\u064A\u0627"
    },
    phonePrefix: "+39",
    phoneLength: 12,
    flag: "/flags/it.png"
  },
  {
    code: "nl",
    name: {
      en: "Netherlands",
      ar: "\u0647\u0648\u0644\u0646\u062F\u0627"
    },
    phonePrefix: "+31",
    phoneLength: 11,
    flag: "/flags/nl.png"
  },
  {
    code: "kr",
    name: {
      en: "South Korea",
      ar: "\u0643\u0648\u0631\u064A\u0627 \u0627\u0644\u062C\u0646\u0648\u0628\u064A\u0629"
    },
    phonePrefix: "+82",
    phoneLength: 12,
    flag: "/flags/kr.png"
  },
  {
    code: "ru",
    name: {
      en: "Russia",
      ar: "\u0631\u0648\u0633\u064A\u0627"
    },
    phonePrefix: "+7",
    phoneLength: 11,
    flag: "/flags/ru.png"
  },
  {
    code: "id",
    name: {
      en: "Indonesia",
      ar: "\u0625\u0646\u062F\u0648\u0646\u064A\u0633\u064A\u0627"
    },
    phonePrefix: "+62",
    phoneLength: 12,
    flag: "/flags/id.png"
  },
  {
    code: "pk",
    name: {
      en: "Pakistan",
      ar: "\u0628\u0627\u0643\u0633\u062A\u0627\u0646"
    },
    phonePrefix: "+92",
    phoneLength: 12,
    flag: "/flags/pk.png"
  },
  {
    code: "bd",
    name: {
      en: "Bangladesh",
      ar: "\u0628\u0646\u063A\u0644\u0627\u062F\u064A\u0634"
    },
    phonePrefix: "+880",
    phoneLength: 13,
    flag: "/flags/bd.png"
  }
];

// src/data/cities.json
var cities_default = [
  {
    id: "qa-doha",
    name: {
      en: "Doha",
      ar: "\u0627\u0644\u062F\u0648\u062D\u0629"
    },
    countryCode: "qa"
  },
  {
    id: "qa-almor",
    name: {
      en: "Al Khor",
      ar: "\u0627\u0644\u062E\u0648\u0631"
    },
    countryCode: "qa"
  },
  {
    id: "eg-cairo",
    name: {
      en: "Cairo",
      ar: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629"
    },
    countryCode: "eg"
  },
  {
    id: "eg-alex",
    name: {
      en: "Alexandria",
      ar: "\u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631\u064A\u0629"
    },
    countryCode: "eg"
  },
  {
    id: "pl-warsaw",
    name: {
      en: "Warsaw",
      ar: "\u0648\u0627\u0631\u0633\u0648"
    },
    countryCode: "pl"
  },
  {
    id: "pl-krakow",
    name: {
      en: "Krak\xF3w",
      ar: "\u0643\u0631\u0627\u0643\u0648\u0641"
    },
    countryCode: "pl"
  },
  {
    id: "lb-beirut",
    name: {
      en: "Beirut",
      ar: "\u0628\u064A\u0631\u0648\u062A"
    },
    countryCode: "lb"
  },
  {
    id: "lb-tripoli",
    name: {
      en: "Tripoli",
      ar: "\u0637\u0631\u0627\u0628\u0644\u0633"
    },
    countryCode: "lb"
  },
  {
    id: "sd-khartoum",
    name: {
      en: "Khartoum",
      ar: "\u0627\u0644\u062E\u0631\u0637\u0648\u0645"
    },
    countryCode: "sd"
  },
  {
    id: "sd-omdurman",
    name: {
      en: "Omdurman",
      ar: "\u0623\u0645 \u062F\u0631\u0645\u0627\u0646"
    },
    countryCode: "sd"
  },
  {
    id: "us-nyc",
    name: {
      en: "New York City",
      ar: "\u0645\u062F\u064A\u0646\u0629 \u0646\u064A\u0648\u064A\u0648\u0631\u0643"
    },
    countryCode: "us"
  },
  {
    id: "us-los",
    name: {
      en: "Los Angeles",
      ar: "\u0644\u0648\u0633 \u0623\u0646\u062C\u0644\u064A\u0633"
    },
    countryCode: "us"
  },
  {
    id: "gb-london",
    name: {
      en: "London",
      ar: "\u0644\u0646\u062F\u0646"
    },
    countryCode: "gb"
  },
  {
    id: "gb-manchester",
    name: {
      en: "Manchester",
      ar: "\u0645\u0627\u0646\u0634\u0633\u062A\u0631"
    },
    countryCode: "gb"
  },
  {
    id: "fr-paris",
    name: {
      en: "Paris",
      ar: "\u0628\u0627\u0631\u064A\u0633"
    },
    countryCode: "fr"
  },
  {
    id: "fr-lyon",
    name: {
      en: "Lyon",
      ar: "\u0644\u064A\u0648\u0646"
    },
    countryCode: "fr"
  },
  {
    id: "de-berlin",
    name: {
      en: "Berlin",
      ar: "\u0628\u0631\u0644\u064A\u0646"
    },
    countryCode: "de"
  },
  {
    id: "de-munich",
    name: {
      en: "Munich",
      ar: "\u0645\u064A\u0648\u0646\u062E"
    },
    countryCode: "de"
  },
  {
    id: "jp-tokyo",
    name: {
      en: "Tokyo",
      ar: "\u0637\u0648\u0643\u064A\u0648"
    },
    countryCode: "jp"
  },
  {
    id: "jp-osaka",
    name: {
      en: "Osaka",
      ar: "\u0623\u0648\u0633\u0627\u0643\u0627"
    },
    countryCode: "jp"
  },
  {
    id: "cn-beijing",
    name: {
      en: "Beijing",
      ar: "\u0628\u0643\u064A\u0646"
    },
    countryCode: "cn"
  },
  {
    id: "cn-shanghai",
    name: {
      en: "Shanghai",
      ar: "\u0634\u0646\u063A\u0647\u0627\u064A"
    },
    countryCode: "cn"
  },
  {
    id: "in-delhi",
    name: {
      en: "New Delhi",
      ar: "\u0646\u064A\u0648\u062F\u0644\u0647\u064A"
    },
    countryCode: "in"
  },
  {
    id: "in-mumbai",
    name: {
      en: "Mumbai",
      ar: "\u0645\u0648\u0645\u0628\u0627\u064A"
    },
    countryCode: "in"
  },
  {
    id: "au-sydney",
    name: {
      en: "Sydney",
      ar: "\u0633\u064A\u062F\u0646\u064A"
    },
    countryCode: "au"
  },
  {
    id: "au-melbourne",
    name: {
      en: "Melbourne",
      ar: "\u0645\u0644\u0628\u0648\u0631\u0646"
    },
    countryCode: "au"
  },
  {
    id: "ca-toronto",
    name: {
      en: "Toronto",
      ar: "\u062A\u0648\u0631\u0648\u0646\u062A\u0648"
    },
    countryCode: "ca"
  },
  {
    id: "ca-vancouver",
    name: {
      en: "Vancouver",
      ar: "\u0641\u0627\u0646\u0643\u0648\u0641\u0631"
    },
    countryCode: "ca"
  },
  {
    id: "mx-mexico",
    name: {
      en: "Mexico City",
      ar: "\u0645\u062F\u064A\u0646\u0629 \u0645\u0643\u0633\u064A\u0643\u0648"
    },
    countryCode: "mx"
  },
  {
    id: "mx-cancun",
    name: {
      en: "Canc\xFAn",
      ar: "\u0643\u0627\u0646\u0643\u0648\u0646"
    },
    countryCode: "mx"
  },
  {
    id: "br-sao",
    name: {
      en: "S\xE3o Paulo",
      ar: "\u0633\u0627\u0648 \u0628\u0627\u0648\u0644\u0648"
    },
    countryCode: "br"
  },
  {
    id: "br-rio",
    name: {
      en: "Rio de Janeiro",
      ar: "\u0631\u064A\u0648 \u062F\u064A \u062C\u0627\u0646\u064A\u0631\u0648"
    },
    countryCode: "br"
  },
  {
    id: "za-jhb",
    name: {
      en: "Johannesburg",
      ar: "\u062C\u0648\u0647\u0627\u0646\u0633\u0628\u0631\u062C"
    },
    countryCode: "za"
  },
  {
    id: "za-capetown",
    name: {
      en: "Cape Town",
      ar: "\u0643\u064A\u0628 \u062A\u0627\u0648\u0646"
    },
    countryCode: "za"
  },
  {
    id: "tr-istanbul",
    name: {
      en: "Istanbul",
      ar: "\u0625\u0633\u0637\u0646\u0628\u0648\u0644"
    },
    countryCode: "tr"
  },
  {
    id: "tr-ankara",
    name: {
      en: "Ankara",
      ar: "\u0623\u0646\u0642\u0631\u0629"
    },
    countryCode: "tr"
  },
  {
    id: "sa-riyadh",
    name: {
      en: "Riyadh",
      ar: "\u0627\u0644\u0631\u064A\u0627\u0636"
    },
    countryCode: "sa"
  },
  {
    id: "sa-jeddah",
    name: {
      en: "Jeddah",
      ar: "\u062C\u062F\u0629"
    },
    countryCode: "sa"
  },
  {
    id: "ae-dubai",
    name: {
      en: "Dubai",
      ar: "\u062F\u0628\u064A"
    },
    countryCode: "ae"
  },
  {
    id: "ae-abudhabi",
    name: {
      en: "Abu Dhabi",
      ar: "\u0623\u0628\u0648 \u0638\u0628\u064A"
    },
    countryCode: "ae"
  },
  {
    id: "sg-singapore",
    name: {
      en: "Singapore",
      ar: "\u0633\u0646\u063A\u0627\u0641\u0648\u0631\u0629"
    },
    countryCode: "sg"
  },
  {
    id: "sg-bukit",
    name: {
      en: "Bukit Timah",
      ar: "\u0628\u0648\u0643\u064A\u062A \u062A\u064A\u0645\u0627\u0647"
    },
    countryCode: "sg"
  },
  {
    id: "th-bangkok",
    name: {
      en: "Bangkok",
      ar: "\u0628\u0627\u0646\u0643\u0648\u0643"
    },
    countryCode: "th"
  },
  {
    id: "th-chiang",
    name: {
      en: "Chiang Mai",
      ar: "\u062A\u0634\u064A\u0627\u0646\u062C \u0645\u0627\u064A"
    },
    countryCode: "th"
  },
  {
    id: "es-madrid",
    name: {
      en: "Madrid",
      ar: "\u0645\u062F\u0631\u064A\u062F"
    },
    countryCode: "es"
  },
  {
    id: "es-barcelona",
    name: {
      en: "Barcelona",
      ar: "\u0628\u0631\u0634\u0644\u0648\u0646\u0629"
    },
    countryCode: "es"
  },
  {
    id: "it-rome",
    name: {
      en: "Rome",
      ar: "\u0631\u0648\u0645\u0627"
    },
    countryCode: "it"
  },
  {
    id: "it-milan",
    name: {
      en: "Milan",
      ar: "\u0645\u064A\u0644\u0627\u0646\u0648"
    },
    countryCode: "it"
  },
  {
    id: "nl-amsterdam",
    name: {
      en: "Amsterdam",
      ar: "\u0623\u0645\u0633\u062A\u0631\u062F\u0627\u0645"
    },
    countryCode: "nl"
  },
  {
    id: "nl-rotterdam",
    name: {
      en: "Rotterdam",
      ar: "\u0631\u0648\u062A\u0631\u062F\u0627\u0645"
    },
    countryCode: "nl"
  },
  {
    id: "kr-seoul",
    name: {
      en: "Seoul",
      ar: "\u0633\u064A\u0648\u0644"
    },
    countryCode: "kr"
  },
  {
    id: "kr-busan",
    name: {
      en: "Busan",
      ar: "\u0628\u0648\u0633\u0627\u0646"
    },
    countryCode: "kr"
  },
  {
    id: "ru-moscow",
    name: {
      en: "Moscow",
      ar: "\u0645\u0648\u0633\u0643\u0648"
    },
    countryCode: "ru"
  },
  {
    id: "ru-stpete",
    name: {
      en: "Saint Petersburg",
      ar: "\u0633\u0627\u0646\u062A \u0628\u0637\u0631\u0633\u0628\u0631\u062C"
    },
    countryCode: "ru"
  },
  {
    id: "id-jakarta",
    name: {
      en: "Jakarta",
      ar: "\u062C\u0627\u0643\u0631\u062A\u0627"
    },
    countryCode: "id"
  },
  {
    id: "id-bandung",
    name: {
      en: "Bandung",
      ar: "\u0628\u0627\u0646\u062F\u0648\u0646\u062C"
    },
    countryCode: "id"
  },
  {
    id: "pk-karachi",
    name: {
      en: "Karachi",
      ar: "\u0643\u0631\u0627\u062A\u0634\u064A"
    },
    countryCode: "pk"
  },
  {
    id: "pk-lahore",
    name: {
      en: "Lahore",
      ar: "\u0644\u0627\u0647\u0648\u0631"
    },
    countryCode: "pk"
  },
  {
    id: "bd-dhaka",
    name: {
      en: "Dhaka",
      ar: "\u062F\u0627\u0643\u0627"
    },
    countryCode: "bd"
  },
  {
    id: "bd-chittagong",
    name: {
      en: "Chattogram",
      ar: "\u062A\u0634\u0627\u062A\u062C\u0631\u0627\u0645"
    },
    countryCode: "bd"
  }
];

// src/data/seed-guests.json
var seed_guests_default = [
  {
    id: "65ee800d-a798-4080-a8fb-8bc5febc77d2",
    firstName: "Donald",
    lastName: "Morris",
    email: "donald.morris.m2k8x@guest257.com",
    phone: "+4917126237953",
    countryCode: "de",
    cityId: "de-berlin",
    checkInDate: "2025-03-15",
    checkOutDate: "2026-02-10",
    roomType: "suite",
    status: "checked-out"
  },
  {
    id: "8899e4eb-83bb-438b-8e23-4b7e60ee115f",
    firstName: "Luna",
    lastName: "Scott",
    email: "luna.scott.60nl8@guest27.com",
    phone: "+6588077542",
    countryCode: "sg",
    cityId: "sg-singapore",
    checkInDate: "2024-03-08",
    checkOutDate: "2025-08-06",
    roomType: "deluxe",
    status: "checked-out"
  },
  {
    id: "8df48bff-aeb3-460b-ba8e-5496d5b0aaaa",
    firstName: "Youssef",
    lastName: "Ramirez",
    email: "youssef.ramirez.j9ck8a@guest376.com",
    phone: "+5511947197859",
    countryCode: "br",
    cityId: "br-sao",
    checkInDate: "2025-03-14",
    checkOutDate: "2025-11-03",
    roomType: "deluxe",
    status: "checked-out"
  },
  {
    id: "1c44e0fc-1529-460a-88f4-401593eda9e6",
    firstName: "Michael",
    lastName: "Hernandez",
    email: "michael.hernandez.pbjmbg@guest369.com",
    phone: "+201027089789",
    countryCode: "eg",
    cityId: "eg-cairo",
    checkInDate: "2024-12-23",
    checkOutDate: "2025-12-08",
    roomType: "suite",
    status: "checked-out"
  },
  {
    id: "ea9db64f-447a-4d8d-8bda-9d75f884e983",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez.ecoeaj@guest352.com",
    phone: "+96179548189",
    countryCode: "lb",
    cityId: "lb-beirut",
    checkInDate: "2025-04-12",
    checkOutDate: "2026-10-09",
    roomType: "standard",
    status: "checked-out"
  },
  {
    id: "b3feaf49-4530-4e55-9059-e63275f80540",
    firstName: "Ali",
    lastName: "Wilson",
    email: "ali.wilson.mrkcg@guest800.com",
    phone: "+249912110501",
    countryCode: "sd",
    cityId: "sd-omdurman",
    checkInDate: "2024-02-01",
    checkOutDate: "2024-02-23",
    roomType: "deluxe",
    status: "cancelled"
  },
  {
    id: "38ae2dcc-7c5d-4cb2-b49a-f4daf3fdffc8",
    firstName: "Aisha",
    lastName: "Scott",
    email: "aisha.scott.wbqwnf@guest111.com",
    phone: "+34786604876",
    countryCode: "es",
    cityId: "es-madrid",
    checkInDate: "2024-05-12",
    checkOutDate: "2024-07-15",
    roomType: "suite",
    status: "cancelled"
  },
  {
    id: "00b9db10-49f1-40f9-8b47-26ee4ad210c1",
    firstName: "Christopher",
    lastName: "Martinez",
    email: "christopher.martinez.dvg0a@guest926.com",
    phone: "+393384240725",
    countryCode: "it",
    cityId: "it-rome",
    checkInDate: "2024-11-23",
    checkOutDate: "2026-09-26",
    roomType: "standard",
    status: "cancelled"
  },
  {
    id: "ca12f144-def6-4ba7-afee-251168dec016",
    firstName: "Olivia",
    lastName: "Abdullah",
    email: "olivia.abdullah.3d9jam@guest106.com",
    phone: "+4917052265569",
    countryCode: "de",
    cityId: "de-berlin",
    checkInDate: "2024-08-22",
    checkOutDate: "2026-12-16",
    roomType: "standard",
    status: "cancelled"
  },
  {
    id: "0c536a7f-6aa8-477f-9f09-1c58c1a3c53a",
    firstName: "Huda",
    lastName: "Hassan",
    email: "huda.hassan.dgfl2n@guest877.com",
    phone: "+61412397705",
    countryCode: "au",
    cityId: "au-melbourne",
    checkInDate: "2025-07-17",
    checkOutDate: "2026-12-02",
    roomType: "standard",
    status: "cancelled"
  },
  {
    id: "29fd35b1-c759-4379-9239-8678aa49d76b",
    firstName: "Mia",
    lastName: "Jackson",
    email: "mia.jackson.l2ov5d@guest929.com",
    phone: "+966544835705",
    countryCode: "sa",
    cityId: "sa-riyadh",
    checkInDate: "2025-05-12",
    checkOutDate: "2026-03-25",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "56b17758-21c5-43ea-9efa-8bcd27cbfc0a",
    firstName: "Paul",
    lastName: "Young",
    email: "paul.young.rqpc8e@guest195.com",
    phone: "+5579924344800",
    countryCode: "br",
    cityId: "br-sao",
    checkInDate: "2024-05-26",
    checkOutDate: "2024-10-31",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "38d9fa8e-5236-4ed1-9640-c2db6d0b91b6",
    firstName: "Michael",
    lastName: "Scott",
    email: "michael.scott.qlc05@guest867.com",
    phone: "+48621436234",
    countryCode: "pl",
    cityId: "pl-krakow",
    checkInDate: "2024-06-07",
    checkOutDate: "2026-12-23",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "8e8da26e-0dc8-41a4-a928-52b04595c3cc",
    firstName: "Hassan",
    lastName: "Perez",
    email: "hassan.perez.bdasf@guest279.com",
    phone: "+628126398406",
    countryCode: "id",
    cityId: "id-jakarta",
    checkInDate: "2025-07-20",
    checkOutDate: "2026-05-13",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "e915ebb6-a179-4a93-a23b-281690e4f22f",
    firstName: "Isabella",
    lastName: "White",
    email: "isabella.white.nr0b9h@guest876.com",
    phone: "+79150965449",
    countryCode: "ru",
    cityId: "ru-stpete",
    checkInDate: "2025-12-19",
    checkOutDate: "2026-07-18",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "0e29b28a-106e-4c85-bbcf-019cd2f04644",
    firstName: "Sara",
    lastName: "Allen",
    email: "sara.allen.2cpdmr@guest54.com",
    phone: "+27712825292",
    countryCode: "za",
    cityId: "za-jhb",
    checkInDate: "2025-04-14",
    checkOutDate: "2026-07-22",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "92763386-c13b-45f4-afb9-dc613313edc0",
    firstName: "Maryam",
    lastName: "Thomas",
    email: "maryam.thomas.q4pgwr@guest98.com",
    phone: "+905301742837",
    countryCode: "tr",
    cityId: "tr-ankara",
    checkInDate: "2024-09-17",
    checkOutDate: "2025-08-22",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "92e304f3-feff-4755-832b-ff827e9eb048",
    firstName: "Leila",
    lastName: "Phillips",
    email: "leila.phillips.hbtu6@guest994.com",
    phone: "+6587534278",
    countryCode: "sg",
    cityId: "sg-singapore",
    checkInDate: "2024-01-24",
    checkOutDate: "2024-09-03",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "07c949b3-180d-4fc1-b6b4-639838adafe5",
    firstName: "Lama",
    lastName: "Ramirez",
    email: "lama.ramirez.ids8t8@guest648.com",
    phone: "+48519710451",
    countryCode: "pl",
    cityId: "pl-warsaw",
    checkInDate: "2024-02-08",
    checkOutDate: "2025-09-24",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "f3ccd67d-2015-494b-be7a-f2606987bad8",
    firstName: "Ahmed",
    lastName: "Cook",
    email: "ahmed.cook.wfarss@guest50.com",
    phone: "+447730538332",
    countryCode: "gb",
    cityId: "gb-manchester",
    checkInDate: "2025-12-01",
    checkOutDate: "2026-08-30",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "3e404a4a-902b-4145-968c-70f38dacbb08",
    firstName: "Christopher",
    lastName: "Phillips",
    email: "christopher.phillips.u4t19q@guest134.com",
    phone: "+27789772190",
    countryCode: "za",
    cityId: "za-capetown",
    checkInDate: "2025-05-31",
    checkOutDate: "2025-09-10",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "4bdd7e0b-b020-49f8-b4aa-e7638e593e4a",
    firstName: "David",
    lastName: "Reeves",
    email: "david.reeves.e8wxif@guest721.com",
    phone: "+8801733584906",
    countryCode: "bd",
    cityId: "bd-dhaka",
    checkInDate: "2024-04-28",
    checkOutDate: "2026-06-08",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "498ec176-3414-4bb7-ac81-8fbc647bf281",
    firstName: "Lama",
    lastName: "Lee",
    email: "lama.lee.aymy5r@guest215.com",
    phone: "+923090739629",
    countryCode: "pk",
    cityId: "pk-lahore",
    checkInDate: "2024-06-25",
    checkOutDate: "2024-12-27",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "c90be1ac-10e4-44d6-b974-f15cea57c671",
    firstName: "Youssef",
    lastName: "Phillips",
    email: "youssef.phillips.1546lg@guest339.com",
    phone: "+33650060045",
    countryCode: "fr",
    cityId: "fr-paris",
    checkInDate: "2024-04-25",
    checkOutDate: "2026-04-13",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "0c007d27-aaf9-4a5b-ba5a-3e66e966656c",
    firstName: "Harper",
    lastName: "Morris",
    email: "harper.morris.g46fks@guest166.com",
    phone: "+971549070501",
    countryCode: "ae",
    cityId: "ae-dubai",
    checkInDate: "2024-02-03",
    checkOutDate: "2026-01-29",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "ff78ece7-0249-4c68-9649-e947ffe45545",
    firstName: "Emma",
    lastName: "Hernandez",
    email: "emma.hernandez.feaif@guest297.com",
    phone: "+4917594882699",
    countryCode: "de",
    cityId: "de-berlin",
    checkInDate: "2025-01-28",
    checkOutDate: "2025-07-13",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "52562943-68f4-4977-ae4b-119c4da57cac",
    firstName: "Maria",
    lastName: "Miller",
    email: "maria.miller.hqhf2a@guest132.com",
    phone: "+27729910583",
    countryCode: "za",
    cityId: "za-capetown",
    checkInDate: "2025-04-22",
    checkOutDate: "2025-11-19",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "55d9f719-3c0f-493d-8e1f-b0f330b91399",
    firstName: "Scarlett",
    lastName: "Williams",
    email: "scarlett.williams.bhouv@guest161.com",
    phone: "+819027325847",
    countryCode: "jp",
    cityId: "jp-tokyo",
    checkInDate: "2024-01-25",
    checkOutDate: "2026-08-09",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "e2f6c307-2fae-4afe-9dfa-7bbdf79196ff",
    firstName: "Camila",
    lastName: "Edwards",
    email: "camila.edwards.uiiejw@guest966.com",
    phone: "+34658643926",
    countryCode: "es",
    cityId: "es-barcelona",
    checkInDate: "2024-05-07",
    checkOutDate: "2026-02-28",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "b16ce605-3cb0-4264-918a-f0263307a41a",
    firstName: "Steven",
    lastName: "Khan",
    email: "steven.khan.2a9bhh@guest651.com",
    phone: "+34631053175",
    countryCode: "es",
    cityId: "es-barcelona",
    checkInDate: "2024-04-17",
    checkOutDate: "2025-06-07",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "716fafae-36dc-424e-815a-b0a071a2eaee",
    firstName: "Maria",
    lastName: "Morris",
    email: "maria.morris.fljf@guest331.com",
    phone: "+821031044231",
    countryCode: "kr",
    cityId: "kr-busan",
    checkInDate: "2024-06-13",
    checkOutDate: "2025-02-21",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "54b56b55-693d-4630-b6a7-cecd65ab06c6",
    firstName: "William",
    lastName: "Jones",
    email: "william.jones.m7e3ha@guest105.com",
    phone: "+14165867525",
    countryCode: "ca",
    cityId: "ca-toronto",
    checkInDate: "2025-08-09",
    checkOutDate: "2026-04-27",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "f794736d-d7cb-4a33-a883-6cf93f536caa",
    firstName: "Youssef",
    lastName: "Williams",
    email: "youssef.williams.emm5ud@guest182.com",
    phone: "+971508809540",
    countryCode: "ae",
    cityId: "ae-abudhabi",
    checkInDate: "2024-06-18",
    checkOutDate: "2025-02-07",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "1ad8ec37-4162-4b02-83fb-8bffb06dbbd2",
    firstName: "Omar",
    lastName: "Clark",
    email: "omar.clark.j4lyi@guest105.com",
    phone: "+919871809819",
    countryCode: "in",
    cityId: "in-delhi",
    checkInDate: "2024-10-24",
    checkOutDate: "2025-03-07",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "598dcc6b-3145-4eb3-b509-15abcf2bb70b",
    firstName: "Hassan",
    lastName: "Lewis",
    email: "hassan.lewis.uq0hfn@guest114.com",
    phone: "+821099249232",
    countryCode: "kr",
    cityId: "kr-busan",
    checkInDate: "2024-10-22",
    checkOutDate: "2025-02-02",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "be773c49-c8dc-4530-9006-950d52576c19",
    firstName: "Khalid",
    lastName: "Phillips",
    email: "khalid.phillips.lk94nr@guest276.com",
    phone: "+8613639749929",
    countryCode: "cn",
    cityId: "cn-beijing",
    checkInDate: "2024-06-28",
    checkOutDate: "2026-05-18",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "91135f2e-51d1-4130-b84d-0d6dacf6f2a2",
    firstName: "Noor",
    lastName: "Evans",
    email: "noor.evans.fh8p1p@guest453.com",
    phone: "+33688949793",
    countryCode: "fr",
    cityId: "fr-lyon",
    checkInDate: "2025-06-22",
    checkOutDate: "2025-09-18",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "fc1d4acd-8315-414c-a862-93efe20cdd82",
    firstName: "Kenneth",
    lastName: "Walker",
    email: "kenneth.walker.fubdqp@guest813.com",
    phone: "+966575895049",
    countryCode: "sa",
    cityId: "sa-jeddah",
    checkInDate: "2025-09-10",
    checkOutDate: "2026-02-03",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "129478c0-0f27-44d4-b05a-2f2ab8ef9e9b",
    firstName: "Scarlett",
    lastName: "Sanchez",
    email: "scarlett.sanchez.vxelv@guest271.com",
    phone: "+12134568741",
    countryCode: "us",
    cityId: "us-los",
    checkInDate: "2024-12-18",
    checkOutDate: "2026-07-30",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "8f02f032-7c7d-4ddb-96c4-59fa0c6b65f5",
    firstName: "Omar",
    lastName: "Ali",
    email: "omar.ali.l7h31@guest491.com",
    phone: "+393322049169",
    countryCode: "it",
    cityId: "it-milan",
    checkInDate: "2025-08-09",
    checkOutDate: "2025-12-20",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "2ab99631-5a21-4dc7-aace-e3ef07c0c418",
    firstName: "Sofia",
    lastName: "Wright",
    email: "sofia.wright.8a43ts@guest67.com",
    phone: "+917472920000",
    countryCode: "in",
    cityId: "in-delhi",
    checkInDate: "2024-12-18",
    checkOutDate: "2026-10-07",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "813e3423-b510-44c2-813b-3f0fe475775e",
    firstName: "Evelyn",
    lastName: "Muhammad",
    email: "evelyn.muhammad.a18tcb@guest306.com",
    phone: "+5511989922383",
    countryCode: "br",
    cityId: "br-sao",
    checkInDate: "2025-05-14",
    checkOutDate: "2026-07-20",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "3ffccbba-d80a-4ca8-a200-91dac9c7fa2b",
    firstName: "Kevin",
    lastName: "Torres",
    email: "kevin.torres.4e1cqy@guest712.com",
    phone: "+6595206873",
    countryCode: "sg",
    cityId: "sg-singapore",
    checkInDate: "2025-05-19",
    checkOutDate: "2025-05-31",
    roomType: "suite",
    status: "checked-in"
  },
  {
    id: "1ebdd0fa-cb90-4e39-9697-dee46f8cf8fc",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia.7te6lg@guest632.com",
    phone: "+97459430649",
    countryCode: "qa",
    cityId: "qa-doha",
    checkInDate: "2024-03-27",
    checkOutDate: "2025-02-25",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "80f376e9-bc64-4254-a7f1-0628c7d318f3",
    firstName: "Charles",
    lastName: "Hassan",
    email: "charles.hassan.dszoud@guest117.com",
    phone: "+971557170752",
    countryCode: "ae",
    cityId: "ae-abudhabi",
    checkInDate: "2025-03-09",
    checkOutDate: "2026-06-20",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "a1c189d3-c3ab-4237-b611-817ef85ebe19",
    firstName: "Dina",
    lastName: "Wilson",
    email: "dina.wilson.8sr6nus@guest732.com",
    phone: "+905314430725",
    countryCode: "tr",
    cityId: "tr-ankara",
    checkInDate: "2024-03-21",
    checkOutDate: "2024-08-13",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "938c25b6-486f-4f3b-9adc-6bc29430bfb3",
    firstName: "Michael",
    lastName: "Ramirez",
    email: "michael.ramirez.y9y5w@guest864.com",
    phone: "+628165678207",
    countryCode: "id",
    cityId: "id-bandung",
    checkInDate: "2025-03-07",
    checkOutDate: "2026-05-14",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "d0622e29-97b8-4003-9d90-c6c9b5d29f8e",
    firstName: "Noor",
    lastName: "Cook",
    email: "noor.cook.o3h9e9@guest523.com",
    phone: "+8613876126814",
    countryCode: "cn",
    cityId: "cn-beijing",
    checkInDate: "2024-06-23",
    checkOutDate: "2024-10-28",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "291c7d29-0dae-4522-97a3-2246ab88636f",
    firstName: "Hassan",
    lastName: "Rodriguez",
    email: "hassan.rodriguez.lqhou@guest296.com",
    phone: "+27824218958",
    countryCode: "za",
    cityId: "za-jhb",
    checkInDate: "2025-10-14",
    checkOutDate: "2026-12-25",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "065d04e7-3864-4e4a-939f-d2bd19a926ce",
    firstName: "Anthony",
    lastName: "Saleh",
    email: "anthony.saleh.jxol6s@guest401.com",
    phone: "+918319437558",
    countryCode: "in",
    cityId: "in-delhi",
    checkInDate: "2025-11-17",
    checkOutDate: "2026-11-24",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "b6640c5d-862b-4c00-8900-547317062c3f",
    firstName: "Harper",
    lastName: "Wilson",
    email: "harper.wilson.5i8d6g@guest545.com",
    phone: "+33632070795",
    countryCode: "fr",
    cityId: "fr-paris",
    checkInDate: "2024-03-15",
    checkOutDate: "2024-06-22",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "cc80136d-1153-47e8-ac48-454f5370f6bf",
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams.tgljne@guest962.com",
    phone: "+34660283802",
    countryCode: "es",
    cityId: "es-barcelona",
    checkInDate: "2024-05-16",
    checkOutDate: "2025-11-28",
    roomType: "deluxe",
    status: "checked-in"
  },
  {
    id: "97cb6e46-89a3-488d-9d55-9dde393831ef",
    firstName: "Ibrahim",
    lastName: "Gonzalez",
    email: "ibrahim.gonzalez.yyk0y@guest904.com",
    phone: "+4917600972472",
    countryCode: "de",
    cityId: "de-berlin",
    checkInDate: "2024-08-15",
    checkOutDate: "2026-02-05",
    roomType: "standard",
    status: "checked-in"
  },
  {
    id: "660677ff-85bb-453a-b2b6-3f3d392f649d",
    firstName: "David",
    lastName: "Davis",
    email: "david.davis.v3w3u@guest45.com",
    phone: "+96176815594",
    countryCode: "lb",
    cityId: "lb-tripoli",
    checkInDate: "2025-04-22",
    checkOutDate: "2025-11-12",
    roomType: "suite",
    status: "reserved"
  },
  {
    id: "b4949572-ee59-4751-98e9-5599010438e2",
    firstName: "William",
    lastName: "Williams",
    email: "william.williams.tfa777@guest112.com",
    phone: "+249921487230",
    countryCode: "sd",
    cityId: "sd-omdurman",
    checkInDate: "2024-02-08",
    checkOutDate: "2025-04-12",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "30e29c2e-68aa-4733-a725-1d88b15e8252",
    firstName: "John",
    lastName: "Brown",
    email: "john.brown.lcb9vn@guest822.com",
    phone: "+79239168186",
    countryCode: "ru",
    cityId: "ru-moscow",
    checkInDate: "2024-12-17",
    checkOutDate: "2025-11-09",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "5ddc1e48-cdaa-4395-8b5e-302cd1b46004",
    firstName: "Maria",
    lastName: "Hernandez",
    email: "maria.hernandez.03plvm@guest628.com",
    phone: "+5521983867248",
    countryCode: "br",
    cityId: "br-rio",
    checkInDate: "2024-07-30",
    checkOutDate: "2024-11-24",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "4bc39827-3848-4530-9629-a582955a1758",
    firstName: "Anthony",
    lastName: "Abdullah",
    email: "anthony.abdullah.8tgd8ep@guest9.com",
    phone: "+8801791768887",
    countryCode: "bd",
    cityId: "bd-chittagong",
    checkInDate: "2024-10-21",
    checkOutDate: "2026-07-17",
    roomType: "standard",
    status: "reserved"
  },
  {
    id: "78b2383a-6379-4cd6-95b7-003843aef8cc",
    firstName: "John",
    lastName: "Cook",
    email: "john.cook.u3s37@guest657.com",
    phone: "+34619730796",
    countryCode: "es",
    cityId: "es-madrid",
    checkInDate: "2024-02-20",
    checkOutDate: "2026-01-14",
    roomType: "deluxe",
    status: "reserved"
  },
  {
    id: "224fdaa6-dc03-45e0-8599-e1ef52f500fa",
    firstName: "Paul",
    lastName: "Harris",
    email: "paul.harris.bwd8sq@guest522.com",
    phone: "+923946143416",
    countryCode: "pk",
    cityId: "pk-karachi",
    checkInDate: "2024-09-20",
    checkOutDate: "2026-04-30",
    roomType: "suite",
    status: "reserved"
  }
];

// src/store.ts
var CountryList = countries_default;
var CityList = cities_default;
var guests = [...seed_guests_default];
function getGuestById(id) {
  return guests.find((g) => g.id === id);
}
function getGuests(params) {
  let result = guests;
  const currentPage = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;
  const status = params.status;
  const countryCode = params.countryCode;
  const search = params.search;
  if (status !== void 0) {
    result = result.filter((g) => g.status === status);
  }
  if (countryCode !== void 0) {
    result = result.filter((g) => g.countryCode === countryCode);
  }
  if (search !== void 0) {
    result = result.filter((g) => {
      const s = search.toLowerCase();
      return g.firstName.toLowerCase().includes(s) || g.lastName.toLowerCase().includes(s) || g.email.toLowerCase().includes(s);
    });
  }
  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  result = result.slice(start, end);
  return {
    data: result,
    total,
    totalPages,
    page: currentPage,
    pageSize
  };
}
function createGuest(body) {
  const id = crypto.randomUUID();
  const guest = {
    id,
    ...body
  };
  guests.push(guest);
  return guest;
}
function updateGuest(id, body) {
  const index = guests.findIndex((g) => g.id === id);
  if (index === -1) {
    return { success: false, reason: "not_found", error: "guest not found" };
  }
  const current = guests[index];
  if (!current) {
    return { success: false, reason: "not_found", error: "guest not found" };
  }
  if (body.status !== current.status && !canTransition(current.status, body.status)) {
    return {
      success: false,
      reason: "invalid_transition",
      error: `Invalid transition from ${current.status} to ${body.status}`
    };
  }
  const guest = { id, ...body };
  guests[index] = guest;
  return { success: true, guest };
}
var allowedTransitions = {
  reserved: ["checked-in", "checked-out", "cancelled"],
  "checked-in": ["checked-out", "cancelled"],
  "checked-out": ["reserved", "cancelled"],
  cancelled: ["reserved", "checked-out"]
};
function canTransition(from, to) {
  return allowedTransitions[from].includes(to);
}
function updateGuestStatus(id, to) {
  const index = guests.findIndex((g) => g.id === id);
  if (index === -1) {
    return { success: false, error: `cannot find guest id =${id}` };
  }
  const guest = guests[index];
  if (!guest) {
    return { success: false, error: `no guest found for id ${id}` };
  }
  if (guest.status === to) {
    return { success: true, guest };
  }
  if (!canTransition(guest.status, to)) {
    return {
      success: false,
      error: `Invalid transition from ${guest.status} to ${to}`
    };
  }
  const updatedGuest = { ...guest, status: to };
  guests[index] = updatedGuest;
  return { success: true, guest: updatedGuest };
}
function bulkUpdateStatus(guestIds, status) {
  const guests2 = [];
  let err = [];
  for (const id of guestIds) {
    const r = updateGuestStatus(id, status);
    switch (r.success) {
      case true:
        guests2.push(r.guest);
        break;
      case false:
        err.push({ id, error: r.error });
        break;
    }
  }
  return { succeeded: guests2, failed: err };
}
function checkEmailAvailability(email) {
  return { available: guests.every((g) => g.email !== email) };
}

// src/handlers/cities.ts
var listCitiesHandler = http2.get(
  "/api/countries/:countryCode/cities",
  async ({ params }) => {
    const { countryCode } = params;
    await delay2();
    const list = CityList.filter((c) => c.countryCode === countryCode);
    if (list.length === 0) {
      return HttpResponse2.json(
        { error: "no cities for the specified countryCode" },
        { status: 404 }
      );
    }
    return HttpResponse2.json(list);
  }
);
var CitiesHandler = [listCitiesHandler];

// src/handlers/countries.ts
import { delay as delay3, http as http3, HttpResponse as HttpResponse3 } from "msw";
var listCountriesHandler = http3.get("/api/countries", async ({ request }) => {
  await delay3();
  let countries = [];
  for (const c of CountryList) {
    countries.push({
      ...c,
      flag: `https://flagcdn.com/w40/${c.code}.png`
    });
  }
  return HttpResponse3.json(countries);
});
var CountriesHandler = [listCountriesHandler];

// src/handlers/guests.ts
import { http as http4, HttpResponse as HttpResponse4, delay as delay4 } from "msw";
var listGuestsHandler = http4.get("/api/guests", async ({ request }) => {
  let queryParams;
  const url = new URL(request.url);
  queryParams = {
    page: url.searchParams.get("page") || void 0,
    pageSize: url.searchParams.get("pageSize") || void 0,
    search: url.searchParams.get("search") || void 0,
    status: url.searchParams.get("status") || void 0,
    countryCode: url.searchParams.get("countryCode") || void 0
  };
  await delay4();
  const response = getGuests(queryParams);
  return HttpResponse4.json(response, { status: 200 });
});
var getGuestHandler = http4.get(
  "/api/guests/:id",
  async ({ params }) => {
    const { id } = params;
    await delay4();
    const guest = getGuestById(id);
    if (guest) {
      return HttpResponse4.json(guest, { status: 200 });
    } else {
      return HttpResponse4.json(
        {
          error: "guest with such id not found"
        },
        { status: 404 }
      );
    }
  }
);
var createGuestHandler = http4.post("/api/guests", async ({ request }) => {
  const guestIn = await request.json();
  await delay4();
  const requiredCount = 10;
  if (Object.keys(guestIn).length < requiredCount || Object.values(guestIn).some((v) => !v)) {
    return HttpResponse4.json(
      { error: "some fields are missing for guest creation" },
      { status: 400 }
    );
  }
  const guestOut = createGuest(guestIn);
  return HttpResponse4.json(guestOut, { status: 201 });
});
var updateGuestHandler = http4.put(
  "/api/guests/:id",
  async ({ params, request }) => {
    const { id } = params;
    const guestIn = await request.json();
    await delay4();
    const result = updateGuest(id, guestIn);
    if (!result.success) {
      const status = result.reason === "not_found" ? 404 : 422;
      return HttpResponse4.json({ error: result.error }, { status });
    }
    return HttpResponse4.json(result.guest, { status: 200 });
  }
);
var updateGuestStatusHandler = http4.patch(
  "/api/guests/:id/status",
  async ({ params, request }) => {
    const { id } = params;
    const { status } = await request.json();
    await delay4();
    const result = updateGuestStatus(id, status);
    switch (result.success) {
      case true:
        return HttpResponse4.json(result.guest, { status: 200 });
      case false:
        return HttpResponse4.json({ error: result.error }, { status: 422 });
    }
  }
);
var updateBulkGuestStatusHandler = http4.patch(
  "/api/guests/bulk-status",
  async ({ request }) => {
    const { guestIds, status } = await request.json();
    await delay4();
    const result = bulkUpdateStatus(guestIds, status);
    return HttpResponse4.json(result, { status: 200 });
  }
);
var checkEmailHandler = http4.get(
  "/api/guests/check-email",
  async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    await delay4();
    if (!email) {
      return HttpResponse4.json(
        { error: "invalid email value" },
        { status: 400 }
      );
    }
    const result = checkEmailAvailability(email);
    return HttpResponse4.json(result, { status: 200 });
  }
);
var guestHandlers = [
  listGuestsHandler,
  updateBulkGuestStatusHandler,
  checkEmailHandler,
  getGuestHandler,
  createGuestHandler,
  updateGuestHandler,
  updateGuestStatusHandler
];

// src/handlers/index.ts
var handlers = [
  ...authHandlers,
  ...guestHandlers,
  ...CitiesHandler,
  ...CountriesHandler
];

// src/index.ts
async function setupMockServer() {
  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: "bypass"
    // don't intercept non-API requests
  });
}
export {
  setupMockServer
};
