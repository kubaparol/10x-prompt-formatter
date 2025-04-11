# Plan implementacji widoku Głównego Edytora (Main Edit View)

## 1. Przegląd
Główny widok aplikacji 10xPromptFormatter umożliwia użytkownikom wklejanie lub wpisywanie tekstu źródłowego, automatycznie wykrywa zmienne w formacie `{{nazwa}}`, pozwala na edycję wartości tych zmiennych w dedykowanych polach oraz wyświetla podgląd finalnego tekstu z podstawionymi wartościami w czasie rzeczywistym. Widok zawiera również funkcję kopiowania gotowego tekstu do schowka. Całość operacji odbywa się lokalnie w przeglądarce użytkownika.

## 2. Routing widoku
Widok powinien być dostępny pod główną ścieżką aplikacji: `/`

## 3. Struktura komponentów
Hierarchia komponentów będzie następująca:

```
/src/pages/index.astro (MainEditView)
  └── /src/components/PromptFormatterApp.tsx (React, client:load)
      ├── /src/components/SourceEditor.tsx (React)
      ├── /src/components/VariableInputsList.tsx (React)
      │   └── /src/components/VariableInput.tsx (React) [* multiple instances]
      ├── /src/components/PreviewPanel.tsx (React)
      └── /src/components/CopyButton.tsx (React)
```

- `index.astro`: Główny plik strony Astro, renderuje layout i osadza główny komponent React.
- `PromptFormatterApp.tsx`: Główny komponent React, zarządza stanem całej aplikacji (tekst źródłowy, lista zmiennych, sformatowany tekst) i koordynuje przepływ danych między komponentami podrzędnymi.
- `SourceEditor.tsx`: Komponent zawierający pole tekstowe (`textarea`) do wprowadzania i edycji tekstu źródłowego. Informuje komponent nadrzędny o zmianach.
- `VariableInputsList.tsx`: Komponent dynamicznie renderujący listę komponentów `VariableInput` na podstawie wykrytych zmiennych.
- `VariableInput.tsx`: Komponent reprezentujący pojedyncze pole edycji dla jednej instancji zmiennej. Wyświetla nazwę zmiennej i pole `input` do wprowadzenia jej wartości. Informuje komponent nadrzędny o zmianach wartości.
- `PreviewPanel.tsx`: Komponent wyświetlający finalny tekst (tylko do odczytu) po podstawieniu wartości zmiennych.
- `CopyButton.tsx`: Komponent przycisku, który kopiuje zawartość `PreviewPanel` do schowka użytkownika.

## 4. Szczegóły komponentów

### `PromptFormatterApp.tsx`
- **Opis komponentu:** Główny kontener aplikacji React. Zarządza stanem: tekstem źródłowym, listą wykrytych instancji zmiennych oraz finalnym sformatowanym tekstem. Wykorzystuje logikę do parsowania tekstu źródłowego, identyfikacji zmiennych i generowania tekstu wynikowego. Renderuje komponenty podrzędne, przekazując im odpowiednie propsy i funkcje zwrotne.
- **Główne elementy:** `div` (kontener), `SourceEditor`, `VariableInputsList`, `PreviewPanel`, `CopyButton`.
- **Obsługiwane interakcje:** Odbiera zdarzenia zmiany tekstu źródłowego z `SourceEditor` oraz zmiany wartości zmiennej z `VariableInputsList`. Aktualizuje stan aplikacji w odpowiedzi na te zdarzenia.
- **Obsługiwana walidacja:** Brak bezpośredniej walidacji, polega na logice parsowania zmiennych (tylko format `{{nazwa}}` jest rozpoznawany).
- **Typy:** `VariableInstance`.
- **Propsy:** Brak (jest to komponent najwyższego poziomu w drzewie React).

### `SourceEditor.tsx`
- **Opis komponentu:** Komponent udostępniający edytowalne pole tekstowe (np. `<textarea>` z biblioteki Shadcn/ui) dla tekstu źródłowego. Powinien wizualnie wyróżniać wykryte tagi zmiennych (np. poprzez stylizację lub użycie bardziej zaawansowanego edytora, chociaż `textarea` jest wystarczające na start). Przy każdej zmianie informuje komponent nadrzędny.
- **Główne elementy:** `Label` (Shadcn), `Textarea` (Shadcn).
- **Obsługiwane interakcje:** Wprowadzanie tekstu przez użytkownika (`onChange`).
- **Obsługiwana walidacja:** Brak.
- **Typy:** `string` (dla wartości pola tekstowego).
- **Propsy:**
    - `value: string`: Aktualny tekst źródłowy.
    - `onChange: (newSourceText: string) => void`: Funkcja zwrotna wywoływana przy zmianie tekstu.

### `VariableInputsList.tsx`
- **Opis komponentu:** Renderuje listę pól edycyjnych (`VariableInput`) dla każdej wykrytej instancji zmiennej. Powinien wyświetlać komunikat, jeśli żadne zmienne nie zostały znalezione. Używa unikalnego identyfikatora (`id`) każdej instancji zmiennej jako klucza (`key`) dla elementów listy React.
- **Główne elementy:** `div` (kontener listy), `VariableInput` (mapowany z listy zmiennych), opcjonalny komunikat o braku zmiennych.
- **Obsługiwane interakcje:** Odbiera zdarzenia zmiany wartości z poszczególnych komponentów `VariableInput` i przekazuje je wyżej do `PromptFormatterApp` wraz z ID instancji zmiennej.
- **Obsługiwana walidacja:** Brak.
- **Typy:** `VariableInstance[]`.
- **Propsy:**
    - `variables: VariableInstance[]`: Tablica wykrytych instancji zmiennych.
    - `onVariableChange: (variableId: string, newValue: string) => void`: Funkcja zwrotna wywoływana przy zmianie wartości w dowolnym `VariableInput`.

### `VariableInput.tsx`
- **Opis komponentu:** Reprezentuje pojedyncze pole do edycji wartości dla konkretnej instancji zmiennej. Wyświetla oryginalny tag zmiennej (np. `{{variable}}`) jako etykietę oraz pole `Input` (Shadcn) do wprowadzenia wartości.
- **Główne elementy:** `div` (kontener), `Label` (Shadcn - wyświetlający `variable.originalTag`), `Input` (Shadcn).
- **Obsługiwane interakcje:** Wprowadzanie tekstu przez użytkownika w polu `Input` (`onChange`).
- **Obsługiwana walidacja:** Brak.
- **Typy:** `VariableInstance`.
- **Propsy:**
    - `variable: VariableInstance`: Instancja zmiennej do wyświetlenia i edycji.
    - `onChange: (newValue: string) => void`: Funkcja zwrotna wywoływana przy zmianie wartości w polu `Input`.

### `PreviewPanel.tsx`
- **Opis komponentu:** Wyświetla sformatowany tekst wynikowy w elemencie tylko do odczytu (np. `div` lub `<pre>`). Tekst jest aktualizowany w czasie rzeczywistym.
- **Główne elementy:** `div` (kontener), `pre` lub `div` (do wyświetlania sformatowanego tekstu).
- **Obsługiwane interakcje:** Brak.
- **Obsługiwana walidacja:** Brak.
- **Typy:** `string`.
- **Propsy:**
    - `formattedText: string`: Finalny tekst po podstawieniu wartości zmiennych.

### `CopyButton.tsx`
- **Opis komponentu:** Przycisk (np. `Button` z Shadcn/ui) umożliwiający skopiowanie zawartości `PreviewPanel` do schowka. Może implementować prosty mechanizm informacji zwrotnej (np. zmiana ikony/tekstu na chwilę po udanym skopiowaniu).
- **Główne elementy:** `Button` (Shadcn).
- **Obsługiwane interakcje:** Kliknięcie przycisku (`onClick`).
- **Obsługiwana walidacja:** Brak.
- **Typy:** `string`.
- **Propsy:**
    - `textToCopy: string`: Tekst do skopiowania (aktualna zawartość `PreviewPanel`).

## 5. Typy
Głównym typem niestandardowym wymaganym w widoku jest `VariableInstance`:

```typescript
// Plik: src/types.ts (lub zdefiniowany lokalnie w PromptFormatterApp.tsx)
interface VariableInstance {
  /** Unikalny identyfikator dla tej konkretnej instancji zmiennej (np. UUID) */
  id: string;
  /** Nazwa zmiennej (tekst pomiędzy {{ a }}) */
  name: string;
  /** Aktualna wartość wprowadzona przez użytkownika dla tej instancji */
  value: string;
  /** Oryginalny, pełny tag znaleziony w tekście źródłowym (np. "{{variable}}") */
  originalTag: string;
}
```

## 6. Zarządzanie stanem
Zarządzanie stanem odbywać się będzie w głównym komponencie React (`PromptFormatterApp.tsx`) przy użyciu hooka `useState` dla następujących elementów:

- `sourceText: string`: Przechowuje aktualną zawartość edytora tekstu źródłowego.
- `variables: VariableInstance[]`: Przechowuje tablicę obiektów reprezentujących wykryte instancje zmiennych. Aktualizowana po każdej zmianie w `sourceText`.
- `formattedText: string`: Przechowuje przetworzony tekst wynikowy. Jest to stan pochodny, który można obliczyć za pomocą `useMemo` lub bezpośrednio w logice renderowania/aktualizacji, bazując na `sourceText` i `variables`.

Opcjonalnie, można stworzyć customowy hook `usePromptParser(sourceText: string)` który hermetyzuje logikę:
1.  Parsowania `sourceText` w poszukiwaniu tagów `{{variable}}` za pomocą wyrażenia regularnego `/\{\{([^}]+)\}\}/g`.
2.  Generowania tablicy `VariableInstance[]`, przypisując unikalne `id` (np. `crypto.randomUUID()`) do każdej instancji. Przy zmianie `sourceText`, lista jest generowana od nowa.
3.  Generowania `formattedText` poprzez iterację po `sourceText` i zastępowanie `originalTag` odpowiednią wartością `value` z aktualnego stanu `variables`.

Aktualizacja wartości konkretnej zmiennej (`VariableInstance.value`) będzie realizowana przez funkcję przekazaną z `PromptFormatterApp` do `VariableInputsList`, która znajdzie odpowiednią zmienną po `id` i zaktualizuje jej wartość w stanie `variables`.

## 7. Integracja API
Aplikacja działa w pełni po stronie klienta. Nie jest wymagana żadna integracja z API backendowym. Operacje takie jak parsowanie tekstu, zarządzanie stanem i generowanie podglądu odbywają się lokalnie w przeglądarce. Kopiowanie do schowka wykorzystuje standardowe API przeglądarki (`navigator.clipboard`).

## 8. Interakcje użytkownika
- **Wprowadzanie tekstu w `SourceEditor`:** Użytkownik wpisuje lub wkleja tekst. Zdarzenie `onChange` aktualizuje stan `sourceText` w `PromptFormatterApp`. Powoduje to ponowne sparsowanie tekstu, aktualizację stanu `variables` i `formattedText`, co skutkuje odświeżeniem `VariableInputsList` i `PreviewPanel`. W celu optymalizacji, parsowanie może być debouncowane.
- **Wprowadzanie wartości w `VariableInput`:** Użytkownik wpisuje wartość dla konkretnej zmiennej. Zdarzenie `onChange` wywołuje funkcję zwrotną w `PromptFormatterApp`, która aktualizuje pole `value` odpowiedniego obiektu `VariableInstance` w stanie `variables` (identyfikując go po `id`). To powoduje przeliczenie `formattedText` i odświeżenie `PreviewPanel`.
- **Kliknięcie `CopyButton`:** Użytkownik klika przycisk. Zdarzenie `onClick` uruchamia funkcję, która pobiera aktualny `formattedText` ze stanu i używa `navigator.clipboard.writeText()` do skopiowania go do schowka. Opcjonalnie wyświetla informację zwrotną o powodzeniu/błędzie.

## 9. Warunki i walidacja
Jedyną niejawną walidacją jest format tagu zmiennej `{{nazwa}}`. Logika parsowania w `PromptFormatterApp` (lub `usePromptParser`) powinna używać wyrażenia regularnego (`/\{\{([^}]+)\}\}/g`), które rozpoznaje tylko poprawnie sformatowane tagi. Niepoprawne tagi (np. `{{var`, `{var}}`) są traktowane jako zwykły tekst i nie generują pól edycji w `VariableInputsList`. Nie jest wymagana żadna inna walidacja danych wejściowych użytkownika.

## 10. Obsługa błędów
Głównym potencjalnym punktem błędu jest operacja kopiowania do schowka, która może się nie udać z różnych powodów (np. brak uprawnień, nieobsługiwana przeglądarka).
- Należy opakować wywołanie `navigator.clipboard.writeText()` w bloku `try...catch`.
- W przypadku błędu (`catch`), należy poinformować użytkownika o niepowodzeniu, np. za pomocą komponentu `Toast` z biblioteki Shadcn/ui.
- W przypadku sukcesu, można również użyć `Toast` lub zmienić stan przycisku `CopyButton` na krótki czas, aby potwierdzić skopiowanie.

Wydajność przy bardzo dużych tekstach może być potencjalnym problemem - debouncing aktualizacji po zmianach w `SourceEditor` jest zalecany jako pierwszy krok optymalizacyjny.

## 11. Kroki implementacji
1.  **Utworzenie struktury plików:** Stwórz pliki `.astro` i `.tsx` dla wszystkich zdefiniowanych komponentów w odpowiednich katalogach (`/src/pages`, `/src/components`).
2.  **Implementacja `MainEditView` (`index.astro`):** Skonfiguruj podstawowy layout strony (np. za pomocą CSS Grid lub Flexbox w Tailwind), aby pomieścić edytor, listę zmiennych i podgląd. Osadź komponent `PromptFormatterApp` z dyrektywą `client:load`.
3.  **Implementacja `PromptFormatterApp.tsx`:**
    - Zdefiniuj stany: `sourceText`, `variables`, `formattedText` (lub logikę do jego wyliczania).
    - Zaimplementuj logikę parsowania tekstu źródłowego (regex) i generowania `VariableInstance[]` z unikalnymi `id`. Rozważ umieszczenie tej logiki w customowym hooku `usePromptParser`.
    - Zaimplementuj logikę generowania `formattedText` na podstawie `sourceText` i `variables`.
    - Zaimplementuj funkcje obsługi zdarzeń (`handleSourceTextChange`, `handleVariableValueChange`).
    - Renderuj komponenty podrzędne, przekazując im odpowiednie stany i funkcje obsługi zdarzeń jako propsy.
4.  **Implementacja `SourceEditor.tsx`:** Użyj komponentu `Textarea` z Shadcn/ui. Połącz jego wartość i zdarzenie `onChange` z propsami `value` i `onChange` otrzymanymi od `PromptFormatterApp`. Dodaj `Label`.
5.  **Implementacja `VariableInput.tsx`:** Użyj komponentów `Label` i `Input` z Shadcn/ui. Wyświetl `variable.originalTag` w etykiecie. Połącz wartość i zdarzenie `onChange` pola `Input` z `variable.value` i funkcją `onChange` przekazaną jako prop.
6.  **Implementacja `VariableInputsList.tsx`:** Renderuj listę komponentów `VariableInput` na podstawie propsa `variables`, używając `variable.id` jako `key`. Przekaż odpowiednią `variable` i funkcję `onVariableChange` (odpowiednio zmodyfikowaną, aby zawierała `variable.id`) do każdego `VariableInput`. Wyświetl komunikat, gdy `variables` jest puste.
7.  **Implementacja `PreviewPanel.tsx`:** Wyświetl `formattedText` (otrzymany jako prop) wewnątrz elementu `<pre>` lub `<div>` ze stylami zapewniającymi czytelność i zawijanie tekstu.
8.  **Implementacja `CopyButton.tsx`:** Użyj komponentu `Button` z Shadcn/ui. W obsłudze `onClick` wywołaj `navigator.clipboard.writeText(textToCopy)` w bloku `try...catch`. Dodaj obsługę informacji zwrotnej (np. przez `Toast` lub zmianę stanu przycisku).
9.  **Styling (Tailwind/Shadcn):** Zastosuj klasy Tailwind i komponenty Shadcn, aby uzyskać pożądany wygląd i układ, dbając o responsywność.
10. **Testowanie:** Przetestuj wszystkie User Stories, w tym wklejanie tekstu, edycję, działanie w czasie rzeczywistym, obsługę duplikatów zmiennych, kopiowanie oraz przypadki brzegowe (pusty tekst, tekst bez zmiennych). Przetestuj działanie na różnych rozmiarach ekranu.
11. **Dostępność (Accessibility):** Upewnij się, że używane są odpowiednie atrybuty ARIA, etykiety są powiązane z polami input, kontrast jest wystarczający, a nawigacja za pomocą klawiatury jest możliwa.
