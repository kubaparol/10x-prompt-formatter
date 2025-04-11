### Główny problem

Edycja przykładowych promptów z kursu 10xDevs może być trudna ze względu na małe okno tekstowe w edytorze Cursor oraz ograniczoną możliwość ręcznej edycji wklejonego tekstu. 10xPromptFormatter upraszcza ten proces, oferując większe okno do pracy, które automatycznie wykrywa miejsca przeznaczone na dynamiczne zmienne (np. {{value}}) oraz umożliwia swobodną edycję całej treści. Na ich podstawie tworzone są dedykowane pola, do których użytkownik wprowadza odpowiednie wartości. Po uzupełnieniu danych finalny tekst z wstawionymi wartościami można łatwo skopiować.

### Najmniejszy zestaw funkcjonalności

- Możliwość wklejania tekstu zawierającego zmienne w formacie {{variable}}.
- Możliwość ręcznej edycji wklejonego tekstu.
- Automatyczne wykrywanie występujących zmiennych w wklejonym tekście.
- Tworzenie pól tekstowych dla wykrytych zmiennych umożliwiające przypisanie wartości.
- Podmiana zmiennych na zadane wartości oraz wyświetlenie finalnego tekstu z możliwością skopiowania.

### Co NIE wchodzi w zakres MVP

- Rozbudowane narzędzia formatowania tekstu.
- Integracje z zewnętrznymi systemami czy bazami danych.
- Zaawansowana edycja lub zapisywanie historii zmian.
- Funkcje wykraczające poza podstawową podmianę zmiennych.

### Kryteria sukcesu

- Użytkownik może bezproblemowo wkleić tekst zawierający przynajmniej jedną zmienną (np. {{value}}).
- System poprawnie identyfikuje wszystkie zmienne w tekście.
- Użytkownik może wprowadzić wartości dla wykrytych zmiennych.
- Użytkownik może ręcznie edytować tekst w celu wprowadzenia dodatkowych modyfikacji.
- Finalny tekst z podmienionymi wartościami jest prawidłowo i natychmiastowo wyświetlany.
