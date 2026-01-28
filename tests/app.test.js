
describe('nameIsValid - проверка имени пользователя', () => {

    test('принимает валидное имя из 2 букв', () => {
        // Arrange (подготовка)
        const validName = 'ab';

        // Act (действие)
        const result = nameIsValid(validName);

        // Assert (проверка)
        expect(result).toBe(true);
    });

    test('отклоняет число вместо строки', () => {
        // Arrange
        const invalidName = 123;

        // Act
        const result = nameIsValid(invalidName);

        // Assert
        expect(result).toBe(false);
    });

    test('отклоняет пустую строку', () => {
        // Arrange
        const invalidName = '';

        // Act
        const result = nameIsValid(invalidName);

        // Assert
        expect(result).toBe(false);
    });

});

test('параметризизованные тесты - валидные имена').each([
    { input: 'ab', reason: 'минимум 2 символа' },
    { input: 'anna', reason: 'обычное имя' },
    { input: 'tanya', reason: 'другое имя' },
    { input: 'abcdefghijklmnop', reason: 'длинное имя' }
])('$reason: "$input" -> true', ({ input }) => {
    expect(nameIsValid(input)).toBe(true);
});


describe('fullTrim - удаление всех пробелов из строки', () => {


    test('возвращает строку без изменений, если нет пробелов', () => {
        // Arrange
        const text = 'anna';

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('anna');
    });

    test('удаляет один пробел в середине строки', () => {
        // Arrange
        const text = 'ann a';

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('anna');
    });

    test('удаляет несколько пробелов в разных местах', () => {
        // Arrange
        const text = '  ann  a  ';

        // Act
        const result = fullTrim(text);

        // Assert
        expect(result).toBe('anna');
    });

    test('Параметризованные тесты - различные виды пробелов').each([
        { input: 'anna', expected: 'anna', description: 'без пробелов' },
        { input: 'ann a', expected: 'anna', description: 'один пробел' },
        { input: '  ann  a  ', expected: 'anna', description: 'множество пробелов' },
        { input: 'a n n a', expected: 'anna', description: 'пробелы между каждой буквой' },
        { input: 'ann\ta', expected: 'anna', description: 'табуляция' },
        { input: '', expected: '', description: 'пустая строка' },
        { input: '   ', expected: '', description: 'только пробелы' },
        { input: null, expected: '', description: 'null' },
        { input: undefined, expected: '', description: 'undefined' }
    ])('$description: fullTrim($input) = "$expected"',
        ({ input, expected }) => {
            // Arrange + Act
            const result = fullTrim(input);

            // Assert
            expect(result).toBe(expected);
        }
    );
});

describe('getTotal - подсчёт суммы заказа со скидкой', () => {


    test('считает сумму для одного товара', () => {
        // Arrange
        const items = [{ price: 10, quantity: 10 }];

        // Act
        const result = getTotal(items);

        // Assert
        expect(result).toBe(100);
    });


    test('выбрасывает ошибку, если скидка - строка', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];
        const discount = '10';

        // Act + Assert
        expect(() => getTotal(items, discount)).toThrow('Скидка должна быть числом');
    });

    test('Параметризованные тесты - невалидные скидки').each([
        { discount: '10', error: 'Скидка должна быть числом', description: 'строка' },
        { discount: null, error: 'Скидка должна быть числом', description: 'null' },
        { discount: -1, error: 'Процент скидки должен быть от 0 до 99', description: 'отрицательное число' },
        { discount: -10, error: 'Процент скидки должен быть от 0 до 99', description: '-10' },
        { discount: 100, error: 'Процент скидки должен быть от 0 до 99', description: '100' },
        { discount: 101, error: 'Процент скидки должен быть от 0 до 99', description: '101' },
    ])('выбрасывает ошибку для скидки: $description', ({ discount, error }) => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act + Assert
        expect(() => getTotal(items, discount)).toThrow(error);
    });
});
