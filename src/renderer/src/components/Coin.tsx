export default function Coin(Value: number): string {
  return Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Value)
}
