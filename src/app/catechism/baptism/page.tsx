import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BaptismPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-baptism');

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
                                alt="Rửa tội" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Rửa Tội</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Nguồn Gốc Sự Sống Mới</h2>
                        <p>Bí tích Rửa Tội là cửa ngõ dẫn vào đời sống Kitô hữu. Qua bí tích này, chúng ta được giải thoát khỏi tội lỗi, tái sinh làm con Thiên Chúa, trở thành chi thể của Chúa Kitô, được sáp nhập vào Hội Thánh và tham dự vào sứ mạng của Hội Thánh.</p>
                        
                        <h3>Đăng ký Rửa Tội cho trẻ em</h3>
                        <p>Đối với các bậc cha mẹ muốn cho con mình được lãnh nhận bí tích Rửa Tội, giáo xứ yêu cầu:</p>
                        <ul>
                            <li>Ít nhất một trong hai cha mẹ phải là người Công giáo.</li>
                            <li>Tham dự một lớp học chuẩn bị về ý nghĩa và trách nhiệm của bí tích.</li>
                            <li>Chọn người đỡ đầu là một người Công giáo đã lãnh nhận bí tích Thêm Sức và đang sống đức tin.</li>
                        </ul>

                        <h3>Quy trình</h3>
                        <p>Vui lòng liên hệ văn phòng giáo xứ ít nhất một tháng trước ngày dự định để bắt đầu quy trình. Các buổi cử hành Rửa Tội cộng đồng thường được tổ chức vào Chúa Nhật đầu tiên của mỗi tháng sau Thánh lễ 10:30.</p>
                        
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
