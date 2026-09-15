<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>先看全局：这是一个纯前端系统</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            理解这一点，后面所有"数据从哪来、存到哪去"的问题都不用再问
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 65:35） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 28 }}>
        {/* 左栏 */}
        <Box style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box style={{ flexDirection: 'row', gap: 18, padding: '20px 22px', background: 'rgba(32,34,89,0.06)', borderLeft: '5px solid #202259', borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ fontSize: 54, fontWeight: 'bold', color: '#202259', lineHeight: 1, letterSpacing: -2 }}>100%</Text>
                <Box style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259' }}>数据全部落在浏览器里</Text>
                    <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, marginTop: 4 }}>
                        没有后端服务、没有数据库、没有接口调用。页面之间靠 localStorage 传数据，所以"下单成功"只是本地写了一条记录。
                    </Text>
                </Box>
            </Box>

            <Box style={{ flexDirection: 'column', gap: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#5C646A', letterSpacing: 0.5 }}>数据分三个桶存放</Text>
                <Box style={{ flexDirection: 'row', gap: 14 }}>
                    {[
                        { icon: 'shopping-cart', title: '交易桶', desc: '购物车与订单。加购、结算、下单都写这里，订单号 AQ- 开头。' },
                        { icon: 'id-card', title: '身份桶', desc: '登录态与会员主档。会员 ID、等级、推荐人、收货地址都在这一桶。' },
                        { icon: 'coins', title: '资金桶', desc: 'BV 台账与 Ecoin 台账。奖金累计、充值、转账产生的流水记在这里。' },
                    ].map(function (it, i) {
                        return (
                            <Box key={i} style={{ flex: 1, padding: '18px 18px', background: '#F4F6F8', borderRadius: 8, flexDirection: 'column', minHeight: 210 }}>
                                <Box style={{ width: 44, height: 44, borderRadius: 10, background: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
                                    <FAIcon name={it.icon} style={{ fill: '#2AA7CF', width: 22, height: 22 }} />
                                </Box>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259' }}>{it.title}</Text>
                                <Text style={{ fontSize: 17, color: '#3F4A55', lineHeight: 1.5, marginTop: 8 }}>{it.desc}</Text>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <Box style={{ flexDirection: 'row', gap: 14, padding: '16px 20px', background: 'rgba(242,135,183,0.14)', borderRadius: 8, alignItems: 'center', marginTop: 'auto' }}>
                <FAIcon name='exclamation-circle' style={{ fill: '#B3528A', width: 22, height: 22 }} />
                <Text style={{ fontSize: 17, color: '#7A2F5C', lineHeight: 1.5 }}>
                    由此推出一条必须提前说明的结论：<span style={{ fontWeight: 'bold' }}>换设备、换浏览器或清缓存，数据不会跟着走</span>。订单详情页已经内置了这句提示文案。
                </Text>
            </Box>
        </Box>

        {/* 右栏：键位清单 */}
        <Box style={{ width: 372, flexDirection: 'column', justifyContent: 'space-between', padding: '22px 22px', background: '#202259', borderRadius: 10 }}>
            <Box style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 2, fontWeight: 'bold' }}>STORAGE KEYS</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 }}>六个核心键位</Text>
                <Text style={{ fontSize: 16, color: '#B9C6E4', lineHeight: 1.5, marginTop: 8 }}>
                    讲清楚这六行，后面每一处数据来源都能对得上号。
                </Text>
            </Box>

            <Box style={{ flexDirection: 'column', gap: 12 }}>
                {[
                    { k: 'al.orders', v: '订单数组，新单插到最前' },
                    { k: 'al.cart', v: '购物车，按商品 ID 合并' },
                    { k: 'al.auth.user', v: '登录态，登录即写入' },
                    { k: 'al.memberData', v: '会员主档，等级与推荐人' },
                    { k: 'al.bvCredits', v: 'BV 奖金台账，含推荐返佣' },
                    { k: 'al.ecoin', v: 'Ecoin 台账，充值转账流水' },
                ].map(function (it, i) {
                    return (
                        <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 10, borderBottom: i === 5 ? 'none' : '1px solid rgba(127,211,236,0.22)' }}>
                            <Text style={{ fontSize: 17, color: '#7FD3EC', fontFamily: 'Menlo, ui-monospace, monospace', width: 148 }}>{it.k}</Text>
                            <Text style={{ fontSize: 16, color: '#D6E2F5', flex: 1 }}>{it.v}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Box style={{ padding: '12px 14px', background: 'rgba(42,167,207,0.16)', borderRadius: 6 }}>
                <Text style={{ fontSize: 16, color: '#CFE9F4', lineHeight: 1.45 }}>
                    额度：单个域下 localStorage 约 5MB，当前数据量远未触及上限。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>03 / 25</Text>
    </Box>
</Slide>
