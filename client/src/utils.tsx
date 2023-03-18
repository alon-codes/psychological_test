export function indexToLetter(i: number): string{
    if(i < 0 || i > 25){
        return "Error";
    }
    return String.fromCharCode(97 + i).toUpperCase();
}