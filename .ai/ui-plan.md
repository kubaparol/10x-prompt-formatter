# Architektura UI dla 10xPromptFormatter

## 1. Przegląd struktury UI

Interfejs użytkownika został zaprojektowany jako jeden główny widok z trzema logicznymi sekcjami:
- **Edytor tekstu:** Główne pole umożliwiające wklejanie i ręczną edycję tekstu zawierającego tagi zmiennych.
- **Pola zmiennych:** Dynamicznie generowane pola edycji dla każdej instancji wykrytego tagu (nawet przy powtarzających się nazwach).
- **Panel podglądu finalnego:** Sekcja wyświetlająca finalny tekst z podmienionymi wartościami w czasie rzeczywistym.

Struktura ta opiera się na globalnym zarządzaniu stanem przy użyciu React Hooks i Context API, co gwarantuje synchronizację między sekcjami. Projekt jest responsywny i zgodny z dobrymi praktykami dostępności (ARIA, odpowiedni kontrast, nawigacja klawiaturowa).

## 2. Lista widoków

### Główny Widok Edycji
- **Ścieżka widoku:** `/`
- **Główny cel:** Umożliwienie użytkownikowi wklejania tekstu, automatycznego wykrywania tagów zmiennych, edycji treści oraz podglądu finalnego tekstu.
- **Kluczowe informacje do wyświetlenia:**
  - Tekst źródłowy z możliwością ręcznej edycji.
  - Lista wykrytych tagów zmiennych wraz z dedykowanymi polami edycji.
  - Finalny, sformatowany podgląd tekstu.
- **Kluczowe komponenty widoku:**
  - Komponent edytora tekstu.
  - Dynamiczna lista pól zmiennych.
  - Panel podglądu finalnego.
  - Komponent kopiowania tekstu.
- **UX, dostępność i względy bezpieczeństwa:**
  - Responsywny układ, który adaptuje się do różnych urządzeń.
  - Zastosowanie oznaczeń ARIA, wysokiego kontrastu oraz wsparcia dla nawigacji klawiaturowej.
  - Intuicyjne interakcje i bezpieczne przetwarzanie danych użytkownika.

## 3. Mapa podróży użytkownika

1. **Wejście do aplikacji:** Użytkownik otwiera główną stronę aplikacji.
2. **Wklejenie tekstu:** Użytkownik wkleja tekst zawierający tagi zmiennych (np. {{variable}}).
3. **Automatyczne wykrycie tagów:** System analizuje tekst i wykrywa wszystkie instancje tagów, generując oddzielne pola edycji dla każdej z nich.
4. **Edycja treści:** Użytkownik modyfikuje zarówno tekst główny, jak i wartości w dedykowanych polach zmiennych.
5. **Aktualizacja podglądu:** Finalny tekst jest aktualizowany w czasie rzeczywistym, odzwierciedlając wprowadzone zmiany.
6. **Kopiowanie finalnego tekstu:** Użytkownik korzysta z przycisku kopiowania, aby pobrać sformatowaną wersję tekstu.

## 4. Układ i struktura nawigacji

Całość interfejsu zawarta jest w jednym głównym widoku z wydzielonymi sekcjami. Nawigacja odbywa się poprzez:
- Przewijanie strony do poszczególnych sekcji (np. za pomocą sticky header lub menu sekcyjnego).
- Automatyczną synchronizację aktualizacji między sekcjami bez przeładowania widoku.

## 5. Kluczowe komponenty

- **Edytor Tekstu:** Pole umożliwiające wklejanie i edycję tekstu oraz automatyczne wykrywanie tagów zmiennych.
- **Dynamiczne Pola Zmienne:** Automatycznie generowane pola edycji dla każdej instancji tagu, obsługujące powtarzające się nazwy.
- **Panel Podglądu Finalnego:** Sekcja wyświetlająca ostatecznie sformatowany tekst po podmianie wartości, aktualizowana w czasie rzeczywistym.
- **Globalny Context i React Hooks:** Mechanizmy zarządzania stanem aplikacji zapewniające synchronizację między komponentami.
- **Komponent Kopiowania Tekstu:** Przyciski i logika umożliwiająca łatwe kopiowanie finalnego tekstu. 