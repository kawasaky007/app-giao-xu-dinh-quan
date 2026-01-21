import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FirstCommunionPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-communion');

    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/catechism"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Giáo lý</Link>
                </Button>
                
                <Card className="overflow-hidden">
                    {image && (
                        <div className="relative h-64 w-full bg-secondary">
                            <Image 
                                src={image.imageUrl} 
                                alt="Rước Lễ Lần Đầu" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Thánh Thể (Rước Lễ Lần Đầu)</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Nguồn Mạch và Chóp Đỉnh Đời Sống Kitô Hữu</h2>
                        <p>Bí tích Thánh Thể là trung tâm của đời sống Kitô hữu. Trong Thánh Lễ, bánh và rượu trở nên Mình và Máu Chúa Kitô. Khi rước lễ, chúng ta được kết hợp mật thiết với Chúa Giêsu, được nuôi dưỡng về mặt thiêng liêng và được tăng cường sự hiệp nhất với anh chị em trong Hội Thánh.</p>
                        
                        <h3>Chuẩn bị cho Rước Lễ Lần Đầu</h3>
                        <p>Các em thiếu nhi trong giáo xứ thường được chuẩn bị để Rước Lễ Lần Đầu vào năm lớp 3. Chương trình chuẩn bị bao gồm:</p>
                        <ul>
                            <li>Các lớp giáo lý hàng tuần để tìm hiểu về ý nghĩa của Bí tích Thánh Thể và Hòa Giải.</li>
                            <li>Sự tham gia của phụ huynh qua các buổi họp và đồng hành cùng con em mình.</li>
                            <li>Lần đầu tiên lãnh nhận Bí tích Hòa Giải (xưng tội) trước khi Rước Lễ Lần Đầu.</li>
                        </ul>

                        <h3>Thánh lễ Rước Lễ Lần Đầu</h3>
                        <p>Thánh lễ Rước Lễ Lần Đầu là một sự kiện cộng đồng vui tươi, thường được cử hành vào cuối mùa xuân. Gia đình và bạn bè được mời đến để cùng chung vui và cầu nguyện cho các em.</p>
                        
                        <div className="mt-8 not-prose">
                            <Button asChild>
                                <Link href="/contact">Liên hệ Văn phòng Giáo xứ</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
