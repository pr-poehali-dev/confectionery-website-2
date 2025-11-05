import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Силиконовая форма "Роза"', price: 450, category: 'Формы', image: '🌹', description: 'Профессиональная форма для мастики' },
    { id: 2, name: 'Гель-краситель красный', price: 280, category: 'Красители', image: '🎨', description: 'Концентрированный пищевой краситель' },
    { id: 3, name: 'Кондитерский мешок набор', price: 590, category: 'Инструменты', image: '🎂', description: 'Набор из 12 насадок' },
    { id: 4, name: 'Мастика сахарная белая 1кг', price: 380, category: 'Материалы', image: '⚪', description: 'Готовая к использованию' },
    { id: 5, name: 'Форма "Бабочка" 3D', price: 520, category: 'Формы', image: '🦋', description: 'Объемная силиконовая форма' },
    { id: 6, name: 'Набор красителей 8 цветов', price: 1250, category: 'Красители', image: '🌈', description: 'Профессиональная палитра' },
    { id: 7, name: 'Вращающаяся подставка', price: 890, category: 'Инструменты', image: '🔄', description: 'Металлическая, диаметр 30см' },
    { id: 8, name: 'Съедобные блестки золото', price: 340, category: 'Декор', image: '✨', description: 'Пищевые блестки 10г' },
    { id: 9, name: 'Форма "Цветы ассорти"', price: 480, category: 'Формы', image: '🌸', description: 'Набор из 5 форм' },
    { id: 10, name: 'Айсинг белый 500г', price: 420, category: 'Материалы', image: '🍰', description: 'Готовая глазурь' },
    { id: 11, name: 'Кисти для росписи набор', price: 650, category: 'Инструменты', image: '🖌️', description: '6 кистей разных размеров' },
    { id: 12, name: 'Съедобная бумага А4', price: 180, category: 'Декор', image: '📄', description: 'Упаковка 10 листов' },
    { id: 13, name: 'Форма "Листья"', price: 390, category: 'Формы', image: '🍃', description: 'Реалистичная текстура' },
    { id: 14, name: 'Краситель гелевый черный', price: 290, category: 'Красители', image: '⚫', description: 'Концентрат 20г' },
    { id: 15, name: 'Скребок кондитерский', price: 220, category: 'Инструменты', image: '🔪', description: 'Металлический' },
    { id: 16, name: 'Сахарные жемчужины микс', price: 320, category: 'Декор', image: '💎', description: 'Разные размеры 100г' },
    { id: 17, name: 'Форма "Геометрия"', price: 560, category: 'Формы', image: '🔷', description: 'Современный дизайн' },
    { id: 18, name: 'Ароматизатор ваниль', price: 250, category: 'Материалы', image: '🌿', description: 'Натуральный экстракт' },
    { id: 19, name: 'Помадка кондитерская', price: 380, category: 'Материалы', image: '🍬', description: 'Белая 500г' },
    { id: 20, name: 'Трафарет узоры набор', price: 450, category: 'Инструменты', image: '📐', description: '10 различных узоров' },
    { id: 21, name: 'Перламутр пищевой', price: 360, category: 'Декор', image: '🌟', description: 'Золотой и серебряный' },
    { id: 22, name: 'Мат текстурный кружево', price: 580, category: 'Инструменты', image: '🕸️', description: 'Силиконовый коврик' },
    { id: 23, name: 'Форма "Сердца"', price: 420, category: 'Формы', image: '❤️', description: 'Набор 3 размера' },
    { id: 24, name: 'Кандурин радуга', price: 490, category: 'Декор', image: '🌈', description: 'Переливающийся краситель' },
  ];

  const categories = ['Все товары', 'Формы', 'Красители', 'Инструменты', 'Материалы', 'Декор'];
  const [selectedCategory, setSelectedCategory] = useState('Все товары');

  const filteredProducts = selectedCategory === 'Все товары' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 sparkle-bg">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="text-3xl">🧁</div>
              <h1 className="text-2xl font-bold text-primary">СладкийМир</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['home', 'catalog', 'about', 'delivery', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`transition-colors ${
                    activeSection === section ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О нас'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="text-center py-16">
              <h2 className="text-5xl font-bold mb-4">Всё для кондитеров</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Профессиональные инструменты и материалы для создания кондитерских шедевров
              </p>
              <Button size="lg" onClick={() => setActiveSection('catalog')}>
                Перейти в каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Формы', 'Красители', 'Инструменты', 'Декор'].map(cat => (
                  <Card
                    key={cat}
                    className="cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 bg-gradient-to-br from-white to-pink-50/50 border-pink-200"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveSection('catalog');
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">
                        {cat === 'Формы' && '🌹'}
                        {cat === 'Красители' && '🎨'}
                        {cat === 'Инструменты' && '🎂'}
                        {cat === 'Декор' && '✨'}
                      </div>
                      <h4 className="font-semibold">{cat}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map(product => (
                  <Card key={product.id} className="hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/90 backdrop-blur border-purple-200">
                    <CardContent className="p-4">
                      <div className="text-6xl mb-4 text-center">{product.image}</div>
                      <Badge className="mb-2">{product.category}</Badge>
                      <h4 className="font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Каталог товаров</h2>
            
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/90 backdrop-blur border-purple-200">
                  <CardContent className="p-4">
                    <div className="text-6xl mb-4 text-center">{product.image}</div>
                    <Badge className="mb-2">{product.category}</Badge>
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong>СладкийМир</strong> — это профессиональный магазин товаров для кондитеров, 
                работающий с 2015 года. Мы специализируемся на продаже качественных инструментов, 
                материалов и декора для создания кондитерских изделий.
              </p>
              <p>
                Наша миссия — обеспечить мастеров-кондитеров всем необходимым для воплощения 
                самых смелых творческих идей. В ассортименте более 500 наименований товаров 
                от ведущих производителей.
              </p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Icon name="Award" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Качество</h4>
                    <p className="text-sm text-gray-600">Только проверенные производители</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Icon name="Truck" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Доставка</h4>
                    <p className="text-sm text-gray-600">По всей России за 2-5 дней</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Icon name="Headphones" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Поддержка</h4>
                    <p className="text-sm text-gray-600">Консультации профессионалов</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Доставка и оплата</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Truck" size={24} className="text-primary" />
                    Способы доставки
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Курьерская доставка по Москве</strong> — 350 ₽, бесплатно от 3000 ₽</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Доставка СДЭК</strong> — рассчитывается автоматически</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Почта России</strong> — от 300 ₽, срок 7-14 дней</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Самовывоз</strong> — бесплатно, пункт выдачи в Москве</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    Способы оплаты
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Онлайн оплата картой (Visa, MasterCard, Мир)</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Оплата при получении (наличные/карта курьеру)</span>
                    </li>
                    <li className="flex gap-2">
                      <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Безналичный расчет для юридических лиц</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="flex items-start gap-2 text-gray-700">
                    <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      При заказе от 5000 ₽ действует бесплатная доставка по всей России! 
                      Все товары тщательно упаковываются для безопасной транспортировки.
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Контакты</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Адрес</h4>
                      <p className="text-gray-700">г. Москва, ул. Кондитерская, д. 15</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Телефон</h4>
                      <p className="text-gray-700">+7 (495) 123-45-67</p>
                      <p className="text-sm text-gray-600">Пн-Пт: 9:00-18:00</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-gray-700">info@sladkiymir.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Напишите нам</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Ваше сообщение"
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="w-full">Отправить</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Мы в социальных сетях</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="outline" size="lg">
                    <Icon name="Instagram" size={20} className="mr-2" />
                    Instagram
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Telegram
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Facebook" size={20} className="mr-2" />
                    VK
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 backdrop-blur border-t border-pink-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3">СладкийМир</h4>
              <p className="text-sm text-gray-600">
                Профессиональные товары для кондитеров с 2015 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer hover:text-primary">Как сделать заказ</li>
                <li className="cursor-pointer hover:text-primary">Способы оплаты</li>
                <li className="cursor-pointer hover:text-primary">Гарантия и возврат</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="cursor-pointer hover:text-primary" onClick={() => setActiveSection('about')}>О нас</li>
                <li className="cursor-pointer hover:text-primary" onClick={() => setActiveSection('contacts')}>Контакты</li>
                <li className="cursor-pointer hover:text-primary">Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>+7 (495) 123-45-67</li>
                <li>info@sladkiymir.ru</li>
                <li>Пн-Пт: 9:00-18:00</li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-gray-600">
            © 2024 СладкийМир. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}