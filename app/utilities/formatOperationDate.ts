export function formatOperationDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    const time = date.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) {
        return `Сьогодні, ${time}`;
    }

    if (isYesterday) {
        return `Вчора, ${time}`;
    }

    return date.toLocaleString("uk-UA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}