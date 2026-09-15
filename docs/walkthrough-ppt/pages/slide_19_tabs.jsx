<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>我的账户：四个 Tab</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            顶部固定显示会员 ID，右侧 Sign out；四个 Tab 各有明确分工
        </Text>
    </Box>

    {/* ===== B 区 内容区（N 卡片横排 · 4 卡） ===== */}
    <Box style={{ height: 540, flexDirection: 'row', gap: 16 }}>
        {[
            {
                icon: 'chart-pie',
                t: 'Overview',
                cn: '总览',
                hot: true,
                rows: [
                    '两张 KPI 卡：Member Bonus 与 Member Ecoin，各带明细展开与 View History',
                    '九宫格功能入口：复购、欢迎包、代客复购、自动维护、会员升级、往期奖金、团队查询、历史累计奖金、充值与转账',
                    '快捷操作：浏览商品与联系客服',
                    '推荐链接区：复制分享链接，并列出推荐产生的 BV 与订单数',
                ],
            },
            {
                icon: 'file-text',
                t: 'Orders',
                cn: '订单',
                hot: false,
                rows: [
                    '分两段：My orders（我自己的单）与 Member orders（我替别人下的单），各带数量角标',
                    '分桶依据是订单上的权益归属人与实际操作账号是否一致',
                    '订单表列出商品编码、名称、数量、单价、总价、总 BV、税率与税额',
                    '单卡片头部给订单号链接、类型徽标、支付状态与 Download 导出',
                ],
            },
            {
                icon: 'user-cog',
                t: 'Profile',
                cn: '资料',
                hot: false,
                rows: [
                    '六张卡片：基础信息、个人信息、登录密码、支付密码、收货地址、通知偏好',
                    '基础信息行展示系统时间、结算周期、会员等级、最高荣誉等级与精英等级',
                    '个人信息里的 Member ID 锁定不可改，编辑态也只放开姓名、国家、邮箱与电话',
                    '通知偏好有三个开关：邮件、短信与 WhatsApp',
                ],
            },
            {
                icon: 'sitemap',
                t: 'Sponsor Network',
                cn: '推荐网络',
                hot: false,
                rows: [
                    '两种模式：Sponsor Network 与 Sponsor Network Ex',
                    '查询条件：顶层会员（会员 ID / 姓名 / PCV）与展开深度',
                    '树节点展示编码、姓名、等级、历史最高等级与个人业绩',
                    '默认展开五层，可查询到下级网络结构',
                ],
            },
        ].map(function (it, i) {
            return (
                <Box key={i} style={{ flex: 1, background: it.hot ? 'rgba(42,167,207,0.10)' : '#F4F6F8', border: it.hot ? '2px solid #2AA7CF' : '1px solid #E3E6E8', borderRadius: 10, padding: '20px 18px', flexDirection: 'column' }}>
                    <Box style={{ width: 46, height: 46, borderRadius: 12, background: it.hot ? '#2AA7CF' : '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                        <FAIcon name={it.icon} style={{ fill: it.hot ? '#FFFFFF' : '#202259', width: 22, height: 22 }} />
                    </Box>
                    <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259', lineHeight: 1.25 }}>{it.t}</Text>
                    <Text style={{ fontSize: 15, color: '#2AA7CF', letterSpacing: 1.4, marginTop: 4, marginBottom: 12 }}>{it.cn}</Text>
                    <Box style={{ flex: 1, flexDirection: 'column', gap: 9 }}>
                        {it.rows.map(function (r, j) {
                            return (
                                <Box key={j} style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
                                    <Box style={{ width: 5, height: 5, borderRadius: 3, background: '#859EB3', marginTop: 7 }} />
                                    <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.45, flex: 1 }}>{r}</Text>
                                </Box>
                            );
                        })}
                    </Box>
                    <Box style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid ' + (it.hot ? 'rgba(42,167,207,0.4)' : '#E3E6E8') }}>
                        <Text style={{ fontSize: 14, color: '#5C646A', fontFamily: 'Menlo, ui-monospace, monospace' }}>
                            {'#' + it.t.toLowerCase().replace(' ', '-')}
                        </Text>
                    </Box>
                </Box>
            );
        })}
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>19 / 25</Text>
    </Box>
</Slide>
