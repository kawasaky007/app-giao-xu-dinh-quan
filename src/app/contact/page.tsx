import { MapPin, Phone, Mailbox } from 'lucide-react';
import ContactForm from './contact-form';

export default function ContactPage() {
    return (
        <main className="py-16 md:py-24 bg-background">
            <div className="container px-4">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-6">Thông Tin Liên Hệ</h2>
                        <div className="space-y-6 text-lg">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-foreground">Địa chỉ</h3>
                                    <p className="text-foreground/80">123 Đường Đức Tin, TP. Tình Yêu, Việt Nam</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-foreground">Điện thoại</h3>
                                    <p className="text-foreground/80"><a href="tel:028-3456-7890" className="hover:text-primary">(028) 3456-7890</a></p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Mailbox className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-foreground">Email</h3>
                                    <p className="text-foreground/80"><a href="mailto:lienhe@giaoxu.com" className="hover:text-primary">lienhe@giaoxu.com</a></p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-headline font-bold text-primary mt-12 mb-6">Bản đồ</h3>
                         <div className="aspect-video w-full rounded-lg overflow-hidden border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447938392909!2d106.6953113147481!3d10.77698399232104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d9f5aa7%3A0x88f01a394a89a3f3!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2sus!4v1626884391738!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div>
                         <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
                         <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
