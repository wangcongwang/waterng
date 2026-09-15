<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>登录后下单：多出来的能力</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            同样是下单页，登录与未登录看到的六处不一样
        </Text>
    </Box>

    {/* ===== B 区（上大图 + 下方卡片） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 16 }}>
        {/* 上：双列对照 */}
        <Box style={{ height: 236, background: '#F4F6F8', borderRadius: 10, padding: 14, justifyContent: 'center' }}>
            <svg width={1132} height={208} viewBox='0 0 1132 208'>
                {/* 表头 */}
                <rect x='0' y='0' width='372' height='30' rx='4' fill='rgba(32,34,89,0.08)' />
                <text x='12' y='21' fill='#202259' fontSize={14} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>对比项</text>
                <rect x='380' y='0' width='352' height='30' rx='4' fill='rgba(32,34,89,0.08)' />
                <text x='392' y='21' fill='#5C646A' fontSize={14} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>未登录（访客）</text>
                <rect x='740' y='0' width='392' height='30' rx='4' fill='#202259' />
                <text x='752' y='21' fill='#FFFFFF' fontSize={14} fontWeight='bold' fontFamily='Inter, PingFang SC, sans-serif'>已登录（已有账户）</text>

                {[
                    { k: '商品卡的 BV 标识', a: '不显示', b: '显示这件商品能得多少 BV', hi: false },
                    { k: '结算摘要的 BV 行', a: '整行不渲染', b: '显示 +N BV 奖励', hi: false },
                    { k: '已保存地址选择器', a: '整块隐藏', b: '可用，还可勾选保存新地址', hi: false },
                    { k: 'Account Balance 支付', a: '置灰禁用', b: '余额大于 0 时可选', hi: true },
                    { k: '下单后地址回写', a: '静默返回，不保存', b: '写入账户地址簿', hi: false },
                    { k: '顶栏与侧边抽屉', a: '一个登录图标', b: '会员头像、会员 ID、退出按钮', hi: false },
                ].map(function (it, i) {
                    var y = 34 + i * 29;
                    return (
                        <g key={i}>
                            <rect x='0' y={y} width='372' height='26' rx='4' fill='#FFFFFF' />
                            <text x='12' y={y + 18} fill='#202259' fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>{it.k}</text>
                            <rect x='380' y={y} width='352' height='26' rx='4' fill={it.hi ? 'rgba(242,135,183,0.16)' : '#FFFFFF'} />
                            <text x='392' y={y + 18} fill={it.hi ? '#B3528A' : '#859EB3'} fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>{it.a}</text>
                            <rect x='740' y={y} width='392' height='26' rx='4' fill={it.hi ? 'rgba(42,167,207,0.16)' : '#EAF6FD'} />
                            <text x='752' y={y + 18} fill={it.hi ? '#1B6C88' : '#202259'} fontSize={14} fontFamily='Inter, PingFang SC, sans-serif'>{it.b}</text>
                        </g>
                    );
                })}
            </svg>
        </Box>

        {/* 下：三张卡片 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                { icon: 'unlock', c: '#2AA7CF', t: 'BV 相关的可见性', d: '登录之后，商品列表会出现 BV 标识，结算摘要会多出一行 BV 奖励。这两处是客户最直观感受到"登录有用"的地方，也是路径三和路径一最大的观感差别。' },
                { icon: 'wallet', c: '#F287B7', t: '余额支付被解锁', d: 'Account Balance 是三条路径里唯一被登录态真正卡住的支付方式 —— 余额取值依赖会员 ID，访客取到 0，选项直接置灰。登录后只要余额大于 0 就能用，而且是当场扣款。' },
                { icon: 'exclamation-triangle', c: '#202259', t: '演示时的两个坑', d: '全新浏览器默认就是登录态，想看访客必须先点 Sign out。另外登出只清登录态，个人资料和地址仍留在本地，所以访客下单表单会被预填姓名和地址，看到时不用惊讶。' },
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>16 / 31</Text>
    </Box>
</Slide>
