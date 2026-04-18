import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  const inquiries = await prisma.contactInquiry.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <header className="mb-12 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-widest uppercase">Admin Dashboard</h1>
        <Link href="/" className="text-sm uppercase tracking-widest text-white/50 hover:text-white">
          Back to Site
        </Link>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">Recent Orders ({orders.length})</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-4 bg-black/50 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{order.customerName}</h3>
                  <span className="text-emerald-400 font-bold">${order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm text-white/50 mb-2">
                  <p>{order.customerEmail}</p>
                  <p>{order.shippingAddress}</p>
                </div>
                <div className="text-xs text-white/40 mb-4">{new Date(order.createdAt).toLocaleString()} • {order.status}</div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-xs uppercase tracking-widest text-white/60 mb-2">Items</h4>
                  {JSON.parse(order.items).map((item: any) => (
                    <div key={item.id} className="text-sm flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-white/40">No orders yet.</p>}
          </div>
        </section>

        <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">Inquiries ({inquiries.length})</h2>
          <div className="space-y-4">
            {inquiries.map(inquiry => (
              <div key={inquiry.id} className="p-4 bg-black/50 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{inquiry.firstName} {inquiry.lastName}</h3>
                  <span className="text-xs text-white/40">{new Date(inquiry.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-white/50 mb-4">{inquiry.email}</p>
                <div className="text-sm bg-white/5 p-4 rounded-lg border border-white/5">
                  "{inquiry.message}"
                </div>
              </div>
            ))}
            {inquiries.length === 0 && <p className="text-white/40">No inquiries yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
