import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MarriagePage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-marriage');

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
                                alt="Hôn Phối" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Hôn Phối</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Giao Ước Tình Yêu</h2>
                        <p>Bí tích Hôn Phối là giao ước mà qua đó một người nam và một người nữ cam kết yêu thương nhau trọn đời, một tình yêu trung thành và sinh hoa kết quả. Hôn nhân Công giáo không chỉ là một hợp đồng xã hội, mà còn là một ơn gọi, phản ánh tình yêu của Chúa Kitô dành cho Hội Thánh.</p>
                        
                        <h3>Chuẩn bị cho Hôn nhân</h3>
                        <p>Giáo xứ chúng tôi rất vui mừng được đồng hành cùng các cặp đôi trên hành trình tiến tới hôn nhân. Để đảm bảo một sự chuẩn bị chu đáo, chúng tôi yêu cầu các cặp đôi:</p>
                        <ul>
                            <li>Liên hệ văn phòng giáo xứ ít nhất 6 tháng trước ngày cưới dự kiến.</li>
                            <li>Tham gia một khóa học dự bị hôn nhân được giáo phận công nhận.</li>
                            <li>Gặp gỡ với linh mục để hoàn tất hồ sơ và được linh hướng.</li>
                        </ul>

                        <h3>Lên kế hoạch cho Thánh lễ Hôn phối</h3>
                        <p>Sau khi hoàn tất các bước chuẩn bị ban đầu, bạn sẽ làm việc với cha xứ và ban phụng vụ để lên kế hoạch cho Thánh lễ, bao gồm việc chọn các bài đọc, bài hát và các chi tiết khác để làm cho ngày đặc biệt của bạn trở nên ý nghĩa và thánh thiêng.</p>
                        
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
