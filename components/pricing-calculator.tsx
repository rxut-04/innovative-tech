"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface FeatureOption {
  id: string
  name: string
  basePrice: number
}

const serviceOptions: FeatureOption[] = [
  { id: "web", name: "Web Development", basePrice: 5000 },
  { id: "mobile", name: "Mobile App", basePrice: 8000 },
  { id: "design", name: "UI/UX Design", basePrice: 3000 },
  { id: "ecommerce", name: "E-commerce", basePrice: 6000 },
]

const featureOptions: FeatureOption[] = [
  { id: "auth", name: "User Authentication", basePrice: 1000 },
  { id: "payment", name: "Payment Processing", basePrice: 1500 },
  { id: "cms", name: "Content Management", basePrice: 2000 },
  { id: "analytics", name: "Analytics Dashboard", basePrice: 2500 },
]

export default function PricingCalculator() {
  const [selectedService, setSelectedService] = useState<string>("web")
  const [complexity, setComplexity] = useState<number>(50)
  const [timeframe, setTimeframe] = useState<number>(3)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [maintenance, setMaintenance] = useState<boolean>(false)

  const calculatePrice = () => {
    // Get base price from selected service
    const servicePrice = serviceOptions.find((s) => s.id === selectedService)?.basePrice || 0

    // Calculate feature prices
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = featureOptions.find((f) => f.id === featureId)
      return total + (feature?.basePrice || 0)
    }, 0)

    // Apply complexity multiplier (1.0 to 2.0)
    const complexityMultiplier = 1 + complexity / 100

    // Apply timeframe adjustment (rush fee for shorter timeframes)
    const timeframeMultiplier = timeframe <= 1 ? 1.3 : timeframe <= 2 ? 1.15 : 1

    // Calculate maintenance cost if selected
    const maintenanceCost = maintenance ? servicePrice * 0.2 : 0

    // Calculate total
    const baseTotal = (servicePrice + featuresPrice) * complexityMultiplier * timeframeMultiplier
    const total = Math.round(baseTotal / 100) * 100 // Round to nearest hundred

    return {
      basePrice: servicePrice,
      featuresPrice,
      complexityAdjustment: (servicePrice + featuresPrice) * (complexityMultiplier - 1),
      timeframeAdjustment: (servicePrice + featuresPrice) * complexityMultiplier * (timeframeMultiplier - 1),
      maintenanceCost,
      total,
      monthlyTotal: maintenance ? Math.round(maintenanceCost) : 0,
    }
  }

  const priceBreakdown = calculatePrice()

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId))
    } else {
      setSelectedFeatures([...selectedFeatures, featureId])
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Project Cost Calculator</CardTitle>
        <CardDescription>
          Estimate the cost of your next digital project with our interactive calculator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Select Service Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <Button
                  key={service.id}
                  variant={selectedService === service.id ? "default" : "outline"}
                  className={selectedService === service.id ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                  onClick={() => setSelectedService(service.id)}
                >
                  {service.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Project Complexity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Simple</span>
                <span>Complex</span>
              </div>
              <Slider
                value={[complexity]}
                min={0}
                max={100}
                step={10}
                onValueChange={(value) => setComplexity(value[0])}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Timeframe (Months)</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>1</span>
                <span>6</span>
              </div>
              <Slider value={[timeframe]} min={1} max={6} step={1} onValueChange={(value) => setTimeframe(value[0])} />
              <div className="text-center mt-1">
                <span className="font-medium">
                  {timeframe} {timeframe === 1 ? "month" : "months"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Additional Features</h3>
            <div className="space-y-3">
              {featureOptions.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={`feature-${feature.id}`}>{feature.name}</Label>
                    <p className="text-sm text-gray-500">+${feature.basePrice.toLocaleString()}</p>
                  </div>
                  <Switch
                    id={`feature-${feature.id}`}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance">Monthly Maintenance</Label>
                <p className="text-sm text-gray-500">Includes hosting, updates & support</p>
              </div>
              <Switch id="maintenance" checked={maintenance} onCheckedChange={setMaintenance} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Estimated Cost</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Service:</span>
                <span>${priceBreakdown.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Additional Features:</span>
                <span>${priceBreakdown.featuresPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Complexity Adjustment:</span>
                <span>${Math.round(priceBreakdown.complexityAdjustment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Timeframe Adjustment:</span>
                <span>${Math.round(priceBreakdown.timeframeAdjustment).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold">
                <span>Project Total:</span>
                <span>${priceBreakdown.total.toLocaleString()}</span>
              </div>
              {maintenance && (
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-gray-200">
                  <span>Monthly Maintenance:</span>
                  <span>${priceBreakdown.monthlyTotal.toLocaleString()}/month</span>
                </div>
              )}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">Request Detailed Quote</Button>
        </div>
      </CardContent>
    </Card>
  )
}
