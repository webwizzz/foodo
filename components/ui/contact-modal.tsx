"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; phone: string }) => void
}

export function ContactModal({ isOpen, onClose, onSubmit }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)
    
    try {
      // Send data to SheetDB
      const response = await fetch('https://sheetdb.io/api/v1/yfl4n660zc2f4', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          timestamp: new Date().toLocaleString(),
          source: 'Pricing Page'
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('SheetDB Error Response:', errorData)
        throw new Error(`Failed to save contact information: ${response.status} - ${errorData}`)
      }

      const result = await response.json()
      console.log('SheetDB Success:', result)

      // Success
      setSubmitSuccess(true)
      
      // Wait a moment to show success message, then call parent onSubmit
      setTimeout(() => {
        onSubmit(formData)
        // Reset form
        setFormData({ name: "", email: "", phone: "" })
        setErrors({ name: "", email: "", phone: "" })
        setSubmitSuccess(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error saving to SheetDB:', error)
      setSubmitError('There was an error saving your information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Get Pricing Information
                </h2>
                <p className="text-gray-600">
                  Please provide your contact details to view our pricing plans.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-colors ${
                      errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-colors ${
                      errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none transition-colors ${
                      errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Success/Error Messages */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}
                
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm">✓ Information saved successfully! Showing prices...</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full bg-lime-400 hover:bg-lime-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-4 rounded-lg transition-colors mt-6"
                >
                  {isSubmitting ? "Saving..." : submitSuccess ? "Success!" : "Submit"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}