describe('Validation', () => {
    it('should show error if validation f(x) returns false', () => {
        const validation = (value) => {
            return value === 'test';
        }
        const result = validation('test');
        expect(result).toBe(true);
    });

    it('should show normal if validation returns true', () => {
        const validation = (value) => {
            return value === 'test';
        }
        const result = validation('wrong value');
        expect(result).toBe(false);
    });
});