<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>注册即首购：一页七个分区</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            不是分步向导，是一页从上到下的长表单，选品和支付都在里面
        </Text>
    </Box>

    {/* ===== B 区（左大图 + 右侧文字） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 24 }}>
        {/* 左：七个分区 */}
        <Box style={{ width: 720, flexDirection: 'column', gap: 10 }}>
            {[
                { n: '1', cn: '基本信息', en: 'Basic Information', f: '国家、语言、会员 ID（只读）、卡级、报单中心 ID' },
                { n: '2', cn: '商品', en: 'Products', f: '十二个商品可勾选，配数量步进器，至少选一件' },
                { n: '3', cn: '网络信息', en: 'Network Information', f: '推荐人 ID、实际推荐人 ID —— 两个都会自动预填' },
                { n: '4', cn: '个人信息', en: 'Personal Information', f: '会员名、手机、邮箱、登录密码、支付密码、收货人及电话' },
                { n: '5', cn: '配送方式', en: 'Delivery Method', f: '送货上门（默认）或自提；选自提会隐藏下一个地址分区' },
                { n: '6', cn: '地址', en: 'Address Details', f: '州、城市、详细地址、区域 —— 全部选填' },
                { n: '7', cn: '支付方式', en: 'Payment Method', f: '货到付款（默认）、银行卡、USSD、银行转账' },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', background: '#F4F6F8', borderRadius: 8, padding: '0 16px' }}>
                        <Box style={{ width: 32, height: 32, borderRadius: 6, background: '#2AA7CF', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>{it.n}</Text>
                        </Box>
                        <Box style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, width: 216 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259' }}>{it.cn}</Text>
                            <Text style={{ fontSize: 13, color: '#859EB3' }}>{it.en}</Text>
                        </Box>
                        <Text style={{ fontSize: 15, color: '#3F4A55', flex: 1, lineHeight: 1.35 }}>{it.f}</Text>
                    </Box>
                );
            })}
        </Box>

        {/* 右：真实必填 + 注意 */}
        <Box style={{ flex: 1, flexDirection: 'column', gap: 14 }}>
            <Box style={{ background: '#202259', borderRadius: 10, padding: '18px 20px', flexDirection: 'column', flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#7FD3EC', letterSpacing: 1.8, fontWeight: 'bold' }}>REQUIRED</Text>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#FFFFFF', marginTop: 8, lineHeight: 1.3 }}>
                    真实必填只有八项
                </Text>
                <Box style={{ flex: 1, flexDirection: 'column', gap: 7, marginTop: 12 }}>
                    {['报单中心 ID', '卡级（Silver / Gold）', '会员名', '手机', '邮箱', '登录密码', '支付密码', '至少一件商品'].map(function (t, i) {
                        return (
                            <Box key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                                <Box style={{ width: 5, height: 5, borderRadius: 3, background: '#2AA7CF' }} />
                                <Text style={{ fontSize: 16, color: '#D6E2F5' }}>{t}</Text>
                            </Box>
                        );
                    })}
                </Box>
                <Text style={{ fontSize: 15, color: '#859EB3', marginTop: 10, lineHeight: 1.4 }}>
                    地址、推荐人、收货人都是选填
                </Text>
            </Box>

            <Box style={{ background: 'rgba(242,135,183,0.14)', borderLeft: '4px solid #F287B7', borderRadius: 8, padding: '14px 16px', flexDirection: 'column' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#7A2F5C', marginBottom: 6 }}>三个容易讲漏的点</Text>
                <Text style={{ fontSize: 15, color: '#4A3040', lineHeight: 1.5 }}>
                    没有条款或隐私政策勾选框 · 没有验证码 · 密码只校验长度不少于六位，无复杂度要求、也没有二次确认。
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
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>11 / 31</Text>
    </Box>
</Slide>
