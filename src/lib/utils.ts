export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function generateDemoOrderRef(): string {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `IP-DEMO-${randomPart}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
