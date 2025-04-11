# Dokument wymagań produktu (PRD) - 10xPromptFormatter

## 1. Przegląd produktu

10xPromptFormatter to aplikacja umożliwiająca dynamiczne tworzenie tekstów z wbudowaną obsługą zmiennych w formacie {{variable}}. Użytkownik wkleja tekst zawierający takie zmienne, które są automatycznie wykrywane i przypisywane do dedykowanych pól edycji. Finalny tekst, odzwierciedlający wprowadzone zmiany, jest wyświetlany w osobnym, nieedytowalnym panelu, umożliwiając szybkie kopiowanie całości.

## 2. Problem użytkownika

Użytkownicy istniejących narzędzi do edycji promptów napotykają następujące problemy:

- Ograniczony obszar edycji, który utrudnia wygodną pracę z tekstem.
- Konieczność ręcznego zastępowania zmiennych, co jest czasochłonne i podatne na błędy.
- Brak wyraźnego rozróżnienia pomiędzy stałym tekstem a zmiennymi.
- Brak funkcjonalności podmiany zmiennych w czasie rzeczywistym, co ogranicza możliwość szybkiej weryfikacji efektów edycji.

## 3. Wymagania funkcjonalne

- Umożliwienie wklejania tekstu zawierającego zmienne w formacie {{variable}}.
- Automatyczne wykrywanie zmiennych w czasie rzeczywistym po wklejeniu tekstu.
- Tworzenie dedykowanych pól edycji dla każdej instancji zmiennej, nawet gdy nazwa się powtarza.
- Możliwość ręcznej edycji tekstu zarówno w głównym obszarze, jak i w dedykowanych polach zmiennych.
- Dynamiczna podmiana zmiennych na zadane wartości z natychmiastową aktualizacją finalnego tekstu.
- Wyświetlanie finalnego tekstu w osobnym, nieedytowalnym panelu umożliwiającym kopiowanie całości.
- Wizualne wyróżnienie zmiennych (np. pogrubienie) w celu ich łatwej identyfikacji.
- Brak walidacji tagów – jedynie poprawnie sformatowane zmienne są przetwarzane.

## 4. Granice produktu

- Produkt skupia się na podstawowej podmianie zmiennych w tekście; nie obejmuje zaawansowanych narzędzi formatowania.
- Nie przewiduje integracji z systemami zewnętrznymi ani bazami danych.
- Brak mechanizmów zapisywania historii zmian.
- Aplikacja działa lokalnie i anonimowo, bez wdrażania mechanizmów uwierzytelniania czy autoryzacji.

## 5. Historyjki użytkowników

US-001: Wklejanie tekstu z tagami zmiennych

- Tytuł: Wklejanie i rozpoznawanie zmiennych
- Opis: Jako użytkownik chcę wkleić tekst zawierający zmienne w formacie {{variable}}, aby szybko rozpocząć pracę z dynamicznym tekstem.
- Kryteria akceptacji:
  - System automatycznie wykrywa wszystkie instancje zmiennych w wklejonym tekście.
  - Dla każdej wykrytej zmiennej tworzony jest oddzielny dedykowany obszar edycji.

US-002: Real-time detekcja i tworzenie pól edycji

- Tytuł: Automatyczne tworzenie pól edycji
- Opis: Jako użytkownik chcę, aby aplikacja automatycznie wykrywała zmienne w czasie rzeczywistym, tworząc oddzielne pola edycji nawet dla zmiennych o tej samej nazwie.
- Kryteria akceptacji:
  - Lista pól edycji jest aktualizowana przy każdej zmianie w obszarze tekstowym.
  - Każda instancja zmiennej jest edytowalna niezależnie.

US-003: Aktualizacja finalnego tekstu

- Tytuł: Dynamiczna podmiana wartości zmiennych
- Opis: Jako użytkownik chcę, aby finalny tekst był automatycznie aktualizowany w czasie rzeczywistym na podstawie zmian wprowadzonych w tekstach i polach zmiennych.
- Kryteria akceptacji:
  - Finalny tekst natychmiast odzwierciedla zmiany dokonane w obszarze edycji.
  - W przypadku braku wprowadzenia nowych wartości, domyślne wartości pozostają niezmienione.

US-004: Ręczna edycja tekstu

- Tytuł: Możliwość ręcznej edycji tekstu
- Opis: Jako użytkownik chcę móc bezpośrednio edytować tekst w głównym obszarze, aby wprowadzać dodatkowe modyfikacje niezwiązane bezpośrednio z podmianą zmiennych.
- Kryteria akceptacji:
  - Użytkownik ma możliwość edytowania tekstu w głównym obszarze edycji.
  - Wprowadzone zmiany są automatycznie uwzględniane przy wyświetlaniu finalnego tekstu.

US-005: Kopiowanie finalnego tekstu

- Tytuł: Kopiowanie gotowego tekstu
- Opis: Jako użytkownik chcę mieć możliwość łatwego kopiowania finalnie wygenerowanego tekstu, zawierającego wszystkie podmiany wartości, aby móc go użyć w innych aplikacjach.
- Kryteria akceptacji:
  - Aplikacja udostępnia przycisk umożliwiający kopiowanie finalnego tekstu.
  - Finalny tekst jest prezentowany w czytelnej, nieedytowalnej formie.

US-006: Bezpieczny dostęp do aplikacji

- Tytuł: Dostęp bez barier uwierzytelniania
- Opis: Jako użytkownik chcę korzystać z aplikacji bez konieczności logowania, przy zachowaniu lokalnego przetwarzania danych, co gwarantuje prywatność i bezpieczeństwo.
- Kryteria akceptacji:
  - Aplikacja działa bez wymogu logowania lub innego mechanizmu uwierzytelniania.
  - Wszystkie operacje i dane przetwarzane są lokalnie, zapewniając ochronę prywatności użytkownika.

## 6. Metryki sukcesu

- 100% poprawne wykrywanie poprawnie sformatowanych tagów {{variable}} w wklejonym tekście.
- Czas aktualizacji finalnego tekstu nie przekracza 1 sekundy od momentu wprowadzenia zmian.
- Użytkownik może bezproblemowo przejść przez proces: wklejenie tekstu, edycja pól, ręczna modyfikacja oraz kopiowanie finalnego tekstu, bez wystąpienia błędów.
- Pozytywne opinie od co najmniej 90% użytkowników testujących MVP, dotyczące użyteczności interfejsu oraz intuicyjności działania.
- Cały proces edycji, od wklejenia tekstu do uzyskania finalnej wersji, odbywa się w maksymalnie 5 krokach.
