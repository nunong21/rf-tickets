export default function Coin(Value: number | bigint): string {
  return Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Value)
}
