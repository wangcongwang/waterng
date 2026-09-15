<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>登录才看得见的六处</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            全部由"登录态"一个判断驱动 —— 其中只有一处是真正的功能限制
        </Text>
    </Box>

    {/* ===== B 区（非对称双栏） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：六项 */}
        <Box style={{ width: 726, flexDirection: 'column', gap: 10 }}>
            {[
                { n: '1', t: '商品卡的 BV 标识', d: '商品列表渲染时先判断登录态，未登录直接不渲染这枚标识。', p: 'products.html · 商品卡片' },
                { n: '2', t: '结算摘要的 BV rewards 行', d: '摘要模板里整行做了条件渲染，未登录时这一行根本不存在。', p: 'checkout.html · 订单摘要' },
                { n: '3', t: '已保存地址选择器', d: '整块容器隐藏，连同里面的"保存此地址到我的账户"勾选框。', p: 'checkout.html · 收货地址' },
                { n: '4', t: 'Account Balance 支付方式', d: '余额取值依赖会员 ID，未登录取到 0；选项置灰，默认选中逻辑也会跳过它。这是六项里唯一的功能性限制。', p: 'checkout.html · 支付方式' },
                { n: '5', t: '下单后的地址回写', d: '只有登录状态下，下单时才会把地址写进账户地址簿。', p: 'checkout.html · 保存地址' },
                { n: '6', t: '顶栏与侧边抽屉', d: '未登录只有一个登录图标；登录后变成会员头像、姓名、会员 ID 和退出按钮。抽屉里的登录块同理。', p: '全站页头' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: i === 3 ? 'rgba(242,135,183,0.14)' : '#F4F6F8', borderRadius: 8, padding: '0 16px', borderLeft: i === 3 ? '4px solid #F287B7' : '4px solid transparent' }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#2AA7CF', fontFamily: 'Menlo, ui-monospace, monospace', width: 20 }}>{it.n}</Text>
                        <Box style={{ flexDirection: 'column', width: 232 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>{it.t}</Text>
                            <Text style={{ fontSize: 13, color: '#859EB3', marginTop: 2 }}>{it.p}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', flex: 1, lineHeight: 1.45 }}>{it.d}</Text>
                    </Box>
                );
            })}
        </Box>

        {/* 右：结论 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 1.8, fontWeight: 'bold' }}>KEY</Text>
                <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 1.35, marginTop: 8 }}>
                    六处里有五处只是展示差异，真正被卡住的只有余额支付。
                </Text>
            </Box>

            <Box style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column', gap: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#202259' }}>两个补充</Text>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5 }}>
                    一、登录后下单，订单会落进"我的订单"，订单 BV 计入自己的奖金 —— 这是路径三和路径一最本质的差别。
                </Text>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5 }}>
                    二、商品详情页的 BV 徽标不受登录态控制，未登录也能看到，口径还和列表页不一致。这一处已在第 7 页单独讲过。
                </Text>
            </Box>

            <Box style={{ background: 'rgba(42,167,207,0.10)', borderRadius: 8, padding: '14px 16px' }}>
                <Text style={{ fontSize: 16, color: '#1B6C88', lineHeight: 1.5 }}>
                    演示建议：先用访客走一遍结算页，再登录走一遍。摘要区少一行 BV、地址选择器整块消失，这个对比最有说服力。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>17 / 31</Text>
    </Box>
</Slide>
