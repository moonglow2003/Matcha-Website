export default function AboutSection() {
  return (
    <div id="about" className="min-h-screen text-white pt-32 pb-24 px-6 md:px-12 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <header className="mb-24 text-center">
          <div className="inline-block bg-black/80 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-xl">OUR STORY</h2>
            <p className="text-xl md:text-2xl text-white font-bold tracking-wide">
              Rooted in tradition, refined for the modern ritual.
            </p>
          </div>
        </header>

        <div className="space-y-32">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden">
              <img 
                src="/shade-grown-origins.jpg" 
                alt="Matcha fields"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            <div className="bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black tracking-tight text-white mb-6">SHADE-GROWN ORIGINS</h3>
              <p className="text-lg text-white font-bold leading-relaxed mb-6">
                Our matcha begins its journey in the misty, high-altitude hills of Uji, Japan. For 20 days before harvest, the tea plants are carefully shaded from direct sunlight.
              </p>
              <p className="text-lg text-white font-bold leading-relaxed">
                This process stresses the plant, causing it to overproduce chlorophyll and L-theanine, resulting in the vibrant emerald color and smooth, umami-rich flavor profile that defines our ceremonial grade blend.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-row-reverse md:flex-row">
            <div className="order-2 md:order-1 bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black tracking-tight text-white mb-6">SLOW GRANITE MILLING</h3>
              <p className="text-lg text-white font-bold leading-relaxed mb-6">
                True ceremonial matcha cannot be rushed. We mill our tencha leaves using traditional granite stone mills, a process that takes an hour to produce just 30 grams of matcha.
              </p>
              <p className="text-lg text-white font-bold leading-relaxed">
                This incredibly slow, low-heat grinding method prevents the delicate nutrients and antioxidants from degrading, ensuring every bowl you whisk is as potent as it is delicious.
              </p>
            </div>
            <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden order-1 md:order-2">
              <img 
                src="/granite-milling.jpg" 
                alt="Granite milling"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
