<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>下单六步：用户实际点了什么</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            按真实点击顺序排列，括号里是界面上的英文按钮原文
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 60:40） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 26 }}>
        {/* 左侧竖向流程 SVG */}
        <Box style={{ width: 700, background: '#F4F6F8', borderRadius: 10, padding: 16, justifyContent: 'center' }}>
            <svg width={668} height={500} viewBox='0 0 668 500'>
                {/* 竖向时间轴 */}
                <line x1='32' y1='30' x2='32' y2='470' stroke='#2AA7CF' strokeWidth='2' strokeDasharray='5 5' />

                {[
                    { t: '浏览商品，点 Add to Cart', d: 'products.html 卡片与商品详情页都有加购按钮' },
                    { t: '打开购物车，核对数量', d: 'cart.html · 数量范围 1–99，可改可删' },
                    { t: '点 Proceed to checkout 进结算', d: '跳转 checkout.html?cart=1' },
                    { t: '选配送方式，填联系人', d: 'Door delivery 或 Self-pickup，再填电话邮箱' },
                    { t: '选支付方式', d: 'COD / Card / USSD / Bank transfer / Account Balance' },
                    { t: '勾同意项，点 Place order 下单', d: '写库后跳 shipping.html?order=AQ-XXXXXX' },
                ].map(function (it, i) {
                    var y = i * 80;
                    return (
                        <g key={i}>
                            <circle cx='32' cy={y + 30} r='20' fill={i === 5 ? '#F287B7' : '#202259'} />
                            <text x='32' y={y + 36} fill='#FFFFFF' fontSize='17' fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{i + 1}</text>
                            <rect x='70' y={y} width='586' height='62' rx='8' fill={i === 5 ? 'rgba(242,135,183,0.14)' : '#FFFFFF'} stroke={i === 5 ? '#F287B7' : '#E3E6E8'} strokeWidth='1.5' />
                            <text x='88' y={y + 27} fill='#202259' fontSize='18' fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>{it.t}</text>
                            <text x='88' y={y + 49} fill='#5C646A' fontSize='15' fontFamily='Inter, PingFang SC, sans-serif'>{it.d}</text>
                        </g>
                    );
                })}
            </svg>
        </Box>

        {/* 右侧要点 */}
        <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#2AA7CF', letterSpacing: 2, fontWeight: 'bold' }}>KEY POINTS</Text>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#202259', marginTop: 10, lineHeight: 1.35 }}>
                    三个容易被问到的细节
                </Text>

                <Box style={{ flexDirection: 'column', gap: 14, marginTop: 18 }}>
                    {[
                        { n: '01', t: 'Buy Now 会跳过购物车', d: '商品详情页的 Buy Now 直接进 checkout?cart=1，它先把商品写进购物车再跳转，所以购物车里的东西也会一起被结算。' },
                        { n: '02', t: '步骤条只有 3 格，表单在一页', d: '步骤条显示 Confirm your order / Payment method / Shipping pickup 三格，但所有区块其实是同页垂直铺开的，点支付方式只切换显示面板。' },
                        { n: '03', t: '下单按钮不是随时可点', d: '两项同意勾选、配送信息填全、邮箱合法、卡信息通过校验、余额充足 —— 五类条件全部满足按钮才放行。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.n}</Text>
                                <Box style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', lineHeight: 1.35 }}>{it.t}</Text>
                                    <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, marginTop: 5 }}>{it.d}</Text>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ padding: '16px 18px', background: '#202259', borderRadius: 8, flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 'auto' }}>
                <FAIcon name='route' style={{ fill: '#7FD3EC', width: 22, height: 22 }} />
                <Text style={{ fontSize: 17, color: '#D6E2F5', lineHeight: 1.5 }}>
                    从第 1 步到第 6 步，用户只需要点 6 次，全程不跳外部页面。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>06 / 25</Text>
    </Box>
</Slide>
