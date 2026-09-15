<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>下单六步与购物车规则</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            三条路径的操作动作一致，括号里是界面上的英文按钮原文
        </Text>
    </Box>

    {/* ===== B 区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：六步 SVG */}
        <Box style={{ width: 720, background: '#F4F6F8', borderRadius: 10, padding: 16, justifyContent: 'center' }}>
            <svg width={688} height={500} viewBox='0 0 688 500'>
                <line x1='32' y1='30' x2='32' y2='470' stroke='#2AA7CF' strokeWidth='2' strokeDasharray='5 5' />
                {[
                    { t: '浏览商品，点 Add to Cart', d: '商品列表卡片与商品详情页都有加购按钮' },
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
                            <text x='32' y={y + 36} fill='#FFFFFF' fontSize={17} fontWeight='bold' textAnchor='middle' fontFamily='Inter, PingFang SC, sans-serif'>{i + 1}</text>
                            <rect x='70' y={y} width='618' height='62' rx='8' fill={i === 5 ? 'rgba(242,135,183,0.14)' : '#FFFFFF'} stroke={i === 5 ? '#F287B7' : '#E3E6E8'} strokeWidth='1.5' />
                            <text x='88' y={y + 27} fill='#202259' fontSize={18} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>{it.t}</text>
                            <text x='88' y={y + 49} fill='#5C646A' fontSize={15} fontFamily='Inter, PingFang SC, sans-serif'>{it.d}</text>
                        </g>
                    );
                })}
            </svg>
        </Box>

        {/* 右：购物车规则 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 12 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>购物车四条规则</Text>
            {[
                { t: '按商品 ID 合并', d: '同一件商品反复加购只增加数量，不会多出重复行。' },
                { t: '数量锁在 1–99', d: '点加减或直接输入都可以，超出范围会被夹回边界。' },
                { t: '两个删除动作', d: 'Remove 删单条，Clear cart 清空整车；空车显示空态卡和继续购物按钮。' },
                { t: '汇总只有四行', d: '件数、商品小计、运费、总计。运费固定显示"结算时计算"，页面不做实际计算，所以总计等于小计。' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#F4F6F8', borderRadius: 8, padding: '0 16px', justifyContent: 'center', borderLeft: '4px solid #2AA7CF' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                        <Text style={{ fontSize: 15, color: '#3F4A55', lineHeight: 1.45, marginTop: 4 }}>{it.d}</Text>
                    </Box>
                );
            })}

            <Box style={{ background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '14px 16px' }}>
                <Text style={{ fontSize: 16, color: '#4A3040', lineHeight: 1.5 }}>
                    提醒：商品详情页的 <span style={{ fontWeight: 'bold' }}>Buy Now</span> 会先把商品写进购物车再跳结算 —— 所以购物车里原有的东西会一起被结算。
                </Text>
            </Box>
        </Box>
    </Box>

    {/* ===== C 区 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 三条下单路径讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>20 / 31</Text>
    </Box>
</Slide>
