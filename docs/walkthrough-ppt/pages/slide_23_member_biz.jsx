<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>五条会员业务线</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            从账户页九宫格可以逐个进入，其中自动维护有硬性门槛
        </Text>
    </Box>

    {/* ===== B 区 内容区（N 卡片横排 · 2+3 错位） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 14 }}>
        {/* 上排 2 卡 */}
        <Box style={{ height: 216, flexDirection: 'row', gap: 16 }}>
            {[
                {
                    tag: 'member-welcome.html',
                    t: 'Member Welcome Pack',
                    cn: '欢迎包',
                    hot: false,
                    d: '注册与首购合成一张表：基本资料、商品、网络信息、个人信息、配送方式、地址、支付方式七个分区，结构与注册页几乎一致。推荐人两个字段会自动带出当前登录会员，若链接上带了推荐参数则优先取链接里的值。提交后生成订单并写入推荐返佣流水，三秒后跳转账户页。',
                    foot: '适合：邀请新会员当场完成首购',
                },
                {
                    tag: 'member-repurchase.html',
                    t: 'Member Repeat Purchase',
                    cn: '代客复购',
                    hot: false,
                    d: '输入会员 ID 搜索到人，再替他选商品下单。商品行同时展示两个价格：DP 是经销商价也就是实际成交价，RP 是零售参考价，两者并列但只按 DP 计算金额与 BV。页面自动带出自己的报单中心，用于归属这笔订单的业绩；生成的订单会标记来源为复购。',
                    foot: '注意：DP 与 RP 并列展示，成交按 DP',
                },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: '#F4F6F8', borderRadius: 10, padding: '18px 20px', flexDirection: 'column' }}>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#202259' }}>{it.t}</Text>
                            <Box style={{ padding: '3px 10px', background: '#202259', borderRadius: 4 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>{it.cn}</Text>
                            </Box>
                            <Text style={{ fontSize: 14, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace', marginLeft: 'auto' }}>{it.tag}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.55, flex: 1 }}>{it.d}</Text>
                        <Box style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #E3E6E8' }}>
                            <Text style={{ fontSize: 15, color: '#2AA7CF', fontWeight: 'bold' }}>{it.foot}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>

        {/* 下排 3 卡 */}
        <Box style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
            {[
                {
                    tag: 'member-auto-maintenance',
                    t: 'Auto-Maintenance',
                    cn: '自动维护',
                    hot: true,
                    d: '操作方式与代客复购完全同构，区别是加了一条硬门槛：所选商品的总 BV 必须达到 90 BV。摘要区会实时显示三态提示 —— 未达标显示 need ≥ 90 BV，刚好达标显示分数加对勾，差一点则显示 not enough。',
                    foot: '门槛：所选商品总 BV ≥ 90 BV',
                },
                {
                    tag: 'member-upgrade',
                    t: 'Member Upgrade',
                    cn: '会员升级',
                    hot: false,
                    d: '按会员 ID 查询后，页面只开放一个可编辑字段：会员等级。姓名与加入日期都是只读展示。等级共六档：Bronze、Silver、Gold、Platinum、Diamond、Corporate，保存后立即生效。',
                    foot: '等级六档，其余字段只读',
                },
                {
                    tag: 'team-inquiry',
                    t: 'Team Inquiry',
                    cn: '团队查询',
                    hot: false,
                    d: '上下两张表，列完全相同：序号、会员编码、会员姓名、状态、个人 BV、PGS 与总 BV。上表是自己，下表是直属团队，成员状态有 ACTIVE、PENDING、INACTIVE 三种徽标。',
                    foot: '刷新时点：每个结算周期结束时',
                },
            ].map(function (it, i) {
                return (
                    <Box key={i} style={{ flex: 1, background: it.hot ? 'rgba(242,135,183,0.12)' : '#F4F6F8', border: it.hot ? '1px solid #F287B7' : '1px solid #E3E6E8', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#202259', lineHeight: 1.25 }}>{it.t}</Text>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, marginBottom: 10 }}>
                            <Box style={{ padding: '3px 10px', background: it.hot ? '#F287B7' : '#202259', borderRadius: 4 }}>
                                <Text style={{ fontSize: 13, color: '#FFFFFF' }}>{it.cn}</Text>
                            </Box>
                            <Text style={{ fontSize: 13, color: '#859EB3', fontFamily: 'Menlo, ui-monospace, monospace' }}>{it.tag}</Text>
                        </Box>
                        <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>{it.d}</Text>
                        <Box style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid ' + (it.hot ? 'rgba(242,135,183,0.45)' : '#E3E6E8') }}>
                            <Text style={{ fontSize: 15, color: it.hot ? '#B3528A' : '#2AA7CF', fontWeight: 'bold', lineHeight: 1.4 }}>{it.foot}</Text>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>23 / 25</Text>
    </Box>
</Slide>
