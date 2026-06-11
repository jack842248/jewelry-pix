export default function (num) {
    const n = Number(num);
    //如果 num是「空值類型」，但不是 0 → return ''，ex.undefined、null、''
    if (!num && num !== 0) {
        return '';
    }
    //判斷「這個值是不是 Not a Number」
    if (isNaN(n)) {
        return '';
    }
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
        return currency;
    })}`;
}