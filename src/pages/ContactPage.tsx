import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Clock, ExternalLink, MapPin, Phone, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

interface ContactFormValues {
  name: string;
  phone: string;
  message: string;
}

export function ContactPage() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit = (data: ContactFormValues) => {
    setSubmittedName(data.name.trim());
    reset();
  };

  return (
    <div className="bg-[#F8F5F0]">
      <section className="bg-white border-b border-[#171717]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium text-[#D92D20] mb-2">Get in Touch</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] tracking-tight">
            Location &amp; Contact
          </h1>
          <p className="mt-3 text-base text-[#5E5E5E] max-w-2xl leading-relaxed">
            Have a question about group dining, takeaway timing, or directions? Call us directly or send a message below.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Restaurant Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#171717]">Address</h2>
                  <p className="mt-1 text-sm text-[#5E5E5E] leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <a
                    href={RESTAURANT_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D92D20] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#171717]">Phone</h2>
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="mt-1 inline-block text-base font-semibold text-[#171717] hover:text-[#D92D20] transition-colors tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-[#5E5E5E]">
                    Available 24/7 for dine-in inquiries, takeaway, and delivery
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#171717]/8 p-6">
              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#171717]">Hours &amp; Services</h2>
                  <p className="mt-1 text-sm text-[#5E5E5E]">{RESTAURANT_INFO.hours}</p>
                  <p className="mt-1 text-sm text-[#5E5E5E]">
                    {RESTAURANT_INFO.services.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#171717]/8 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#171717]">
              Send a Message
            </h2>
            <p className="mt-1.5 text-sm text-[#5E5E5E]">
              This is a frontend MVP preview form. For immediate assistance, please call{' '}
              <a href={RESTAURANT_INFO.phoneHref} className="text-[#171717] font-medium underline">
                {RESTAURANT_INFO.phoneDisplay}
              </a>
              .
            </p>

            {submittedName && (
              <div className="mt-6 p-4 rounded-xl bg-[#FFF8EF] border border-[#171717]/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D92D20] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-[#171717]">
                    Demo message recorded for {submittedName}
                  </p>
                  <p className="mt-1 text-[#5E5E5E]">
                    No backend message was transmitted in this frontend MVP. Please call the restaurant directly for live orders or reservations.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  {...register('name', {
                    required: 'Please enter your name',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 min-h-[46px] rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  {...register('phone', {
                    required: 'Please enter your phone number',
                    minLength: { value: 7, message: 'Please enter a valid phone number' },
                  })}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full px-4 py-3 min-h-[46px] rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#171717] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  {...register('message', {
                    required: 'Please enter your message',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg border border-[#171717]/15 bg-[#F8F5F0]/50 text-sm text-[#171717] focus:bg-white focus:outline-none focus:border-[#D92D20]"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-[#D92D20]">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-lg bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Demo Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
