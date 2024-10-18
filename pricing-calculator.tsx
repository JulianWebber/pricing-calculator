"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PricingCalculator() {
  const [seats, setSeats] = useState(1)
  const [usage, setUsage] = useState(0)
  const [discountTier, setDiscountTier] = useState("none")
  const [totalPrice, setTotalPrice] = useState(0)

  const basePrice = 10 // Price per seat
  const usageRate = 0.05 // Price per unit of usage
  const discounts = {
    none: 0,
    small: 0.1,
    medium: 0.15,
    large: 0.2,
  }

  useEffect(() => {
    const seatCost = seats * basePrice
    const usageCost = usage * usageRate
    const subtotal = seatCost + usageCost
    const discountAmount = subtotal * discounts[discountTier]
    const total = subtotal - discountAmount
    setTotalPrice(total)
  }, [seats, usage, discountTier])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>SaaS Pricing Calculator</CardTitle>
        <CardDescription>Calculate your monthly subscription based on seats, usage, and discounts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seats">Number of Seats</Label>
          <Input
            id="seats"
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="usage">Monthly Usage (units)</Label>
          <Input
            id="usage"
            type="number"
            min="0"
            value={usage}
            onChange={(e) => setUsage(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount Tier</Label>
          <Select value={discountTier} onValueChange={setDiscountTier}>
            <SelectTrigger id="discount">
              <SelectValue placeholder="Select a discount tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small (10%)</SelectItem>
              <SelectItem value="medium">Medium (15%)</SelectItem>
              <SelectItem value="large">Large (20%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Seats ({seats} @ ${basePrice}/seat)</TableCell>
              <TableCell className="text-right">${(seats * basePrice).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Usage ({usage} units @ ${usageRate}/unit)</TableCell>
              <TableCell className="text-right">${(usage * usageRate).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell className="text-right">${((seats * basePrice) + (usage * usageRate)).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount ({(discounts[discountTier] * 100).toFixed(0)}%)</TableCell>
              <TableCell className="text-right">-${(((seats * basePrice) + (usage * usageRate)) * discounts[discountTier]).toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="w-full text-right text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}/month
        </div>
      </CardFooter>
    </Card>
  )
}