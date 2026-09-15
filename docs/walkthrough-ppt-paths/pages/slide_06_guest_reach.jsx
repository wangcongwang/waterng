<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>访客能走多远</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            全站只有一个登录守卫，而且不在下单链路上
        </Text>
    </Box>

    {/* ===== B 区（上大图 + 下方卡片） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 16 }}>
        {/* 上：守卫分布图 */}
        <Box style={{ height: 236, background: '#F4F6F8', borderRadius: 10, padding: 14, justifyContent: 'center' }}>
            <svg width={1132} height={208} viewBox='0 0 1132 208'>
                {[
                    { n: 'products.html', s: '商品列表' },
                    { n: 'product-detail', s: '商品详情' },
                    { n: 'cart.html', s: '购物车' },
                    { n: 'checkout.html', s: '结算' },
                    { n: 'shipping.html', s: '下单落地页' },
                    { n: 'order.html', s: '订单详情' },
                    { n: 'account.html', s: '我的账户', guard: true },
                    { n: 'member-*.html', s: '代客下单系列' },
                ].map(function (it, i) {
                    var x = i * 142;
                    return (
                        <g key={i}>
                            <rect x={x} y={18} width={134} height={74} rx={8} fill={it.guard ? '#FFFFFF' : '#202259'} stroke={it.guard ? '#F287B7' : 'none'} strokeWidth={it.guard ? 2 : 0} />
                            <text x={x + 67} y={45} fill={it.guard ? '#202259' : '#FFFFFF'} fontSize={14} fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{it.n}</text>
                            <text x={x + 67} y={67} fill={it.guard ? '#B3528A' : '#7FD3EC'} fontSize={13} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{it.s}</text>
                            <text x={x + 67} y={82} fill={it.guard ? '#B3528A' : '#859EB3'} fontSize={12} textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{it.guard ? '有登录守卫' : '无守卫'}</text>
                        </g>
                    );
                })}

                {/* 标注 */}
                <line x1='0' y1='128' x2='1132' y2='128' stroke='#E3E6E8' strokeWidth='2' />
                <rect x='0' y='146' width='632' height='46' rx='6' fill='rgba(32,34,89,0.06)' />
                <text x='18' y='175' fill='#202259' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>下单链路六个页面全部无守卫 —— 访客可以一路走到 Place order</text>
                <rect x='646' y='146' width='486' height='46' rx='6' fill='rgba(242,135,183,0.14)' />
                <text x='664' y='175' fill='#7A2F5C' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>只有账户页会强制跳登录页，并带 next 参数回跳</text>
            </svg>
        </Box>

        {/* 下：三张卡片 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                { icon: 'route', c: '#202259', t: '访客能做完整个流程', d: '浏览商品、加购、改数量、进结算、选配送与自提点、选支付方式、勾同意、点 Place order —— 全站没有任何一步会把他踢到登录页。这是刻意的设计，代码注释里也写明了允许访客下单。' },
                { icon: 'shield', c: '#F287B7', t: '唯一的守卫在账户页', d: '未登录访问我的账户页会被强制跳转到登录页，同时带上 next 参数指向账户页；登录成功之后自动跳回。除此之外全站没有第二处拦截，代客复购、自动维护这些页面同样没有守卫。' },
                { icon: 'check-circle', c: '#2AA7CF', t: '下单按钮不校验登录态', d: 'Place order 的放行条件只有五项：两类同意勾选、配送信息完整、邮箱格式合法、支付方式自身校验通过、余额充足。其中邮箱是必填的，因为下单后要用它发送订单链接。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E3E6E8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <FAIcon name={it.icon} style={{ fill: it.c, width: 22, height: 22 }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>06 / 31</Text>
    </Box>
</Slide>
