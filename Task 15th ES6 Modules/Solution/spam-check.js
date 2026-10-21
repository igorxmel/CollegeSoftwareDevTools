const SPAM_WORDS = ["кредит", "xxx"];

export function checkSpam(text) {
    const normalized = text.toLowerCase();
    return SPAM_WORDS.some((word) => normalized.includes(word));
}
