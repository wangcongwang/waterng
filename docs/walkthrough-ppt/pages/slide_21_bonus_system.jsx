<Slide style={{ width: 1280, height: 720, padding: '20px 60px', fontFamily: 'Inter, PingFang SC, Helvetica Neue, sans-serif', background: '#FFFFFF' }}>
    {/* ===== A 区 标题块 ===== */}
    <Box style={{ height: 100, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#202259', lineHeight: 1.3 }}>奖金体系：九类 · 周期 · 累计</Text>
        <Text style={{ fontSize: 16, color: '#5C646A', lineHeight: 1.4, marginTop: 6 }}>
            九类奖金名称是展示字段，周期表与累计视图都基于同一批数据
        </Text>
    </Box>

    {/* ===== B 区 内容区（非对称双栏 55:45） ===== */}
    <Box style={{ height: 540, flexDirection: 'column', gap: 16 }}>
        {/* 九类奖金 */}
        <Box style={{ height: 186, flexDirection: 'row', gap: 20 }}>
            <Box style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259', marginBottom: 10 }}>
                    往期奖金弹窗里出现的全部九类
                </Text>
                <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
                    {['Elite Bonus', 'Pro Elite Bonus', 'Super Elite Bonus', 'Stockist Bonus', 'LeaderShip Bonus', 'Welcome Bonus', 'Car Bonus', 'Performance Bonus', 'Builder Bonus'].map(function (t, i) {
                        return (
                            <Box key={i} style={{ padding: '8px 14px', background: i === 4 ? 'rgba(242,135,183,0.16)' : '#F4F6F8', border: '1px solid ' + (i === 4 ? '#F287B7' : '#E3E6E8'), borderRadius: 6 }}>
                                <Text style={{ fontSize: 16, color: i === 4 ? '#7A2F5C' : '#202259', fontWeight: 'bold' }}>{t}</Text>
                            </Box>
                        );
                    })}
                    <Box style={{ padding: '8px 14px', background: '#202259', borderRadius: 6 }}>
                        <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>Total Bonus 合计</Text>
                    </Box>
                </Box>
            </Box>

            <Box style={{ width: 400, background: 'rgba(42,167,207,0.10)', borderRadius: 10, padding: '16px 18px', flexDirection: 'column' }}>
                <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <FAIcon name='info-circle' style={{ fill: '#2AA7CF', width: 20, height: 20 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#202259' }}>务必先说清一句</Text>
                </Box>
                <Text style={{ fontSize: 16, color: '#3F4A55', lineHeight: 1.5, flex: 1 }}>
                    这九类名称目前是<span style={{ fontWeight: 'bold', color: '#202259' }}>展示型字段</span>，页面上没有任何佣金比例、计算规则或晋升条件。周期数据来自演示数据，不是业务结果。
                </Text>
                <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.45, marginTop: 8 }}>
                    对外统一口径：奖金规则由注册你的经销商线下完整说明。
                </Text>
            </Box>
        </Box>

        {/* 周期表 */}
        <Box style={{ flex: 1, flexDirection: 'column' }}>
            <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#202259' }}>Previous Bonus — Historical Periods · 演示数值</Text>
                <Text style={{ fontSize: 15, color: '#5C646A' }}>每行可点 View 查看该周期明细</Text>
            </Box>
            <Table
                style={{ width: '100%', height: 268 }}
                defaultTextStyle={{ fontSize: 13, textAlign: 'center', color: '#25292C' }}
                defaultCellStyle={{
                    border: {
                        left: { width: 1, color: '#E3E6E8' },
                        right: { width: 1, color: '#E3E6E8' },
                        top: { width: 1, color: '#E3E6E8' },
                        bottom: { width: 1, color: '#E3E6E8' },
                    },
                }}
                cells={[
                    [
                        { text: 'Pay Cycle', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Level', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Elite', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Pro Elite', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Super Elite', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Stockist', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'LeaderShip', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Welcome', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Car', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Performance', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Builder', textStyle: { bold: true, color: '#FFFFFF', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                        { text: 'Total', textStyle: { bold: true, color: '#7FD3EC', fontSize: 13 }, cellStyle: { background: { color: '#202259' } } },
                    ],
                    ['165', 'Gold', '0', '0', '0', '0', '0', '0', '0', '0', '0', { text: '0.00', textStyle: { bold: true, color: '#5C646A' } }],
                    [
                        { text: '164', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: 'Silver', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '150', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '50', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '0', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '25', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '75', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '0', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '0', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '100', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '30', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '430.00', textStyle: { bold: true, color: '#202259' }, cellStyle: { background: { color: '#F4F6F8' } } },
                    ],
                    ['163', 'Bronze', '80', '0', '0', '10', '0', '0', '0', '45', '15', { text: '150.00', textStyle: { bold: true, color: '#202259' } }],
                    [
                        { text: '162', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: 'Silver', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '200', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '75', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '25', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '50', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '100', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '0', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '0', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '150', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '40', cellStyle: { background: { color: '#F4F6F8' } } },
                        { text: '640.00', textStyle: { bold: true, color: '#202259' }, cellStyle: { background: { color: '#F4F6F8' } } },
                    ],
                    ['161', 'Gold', '300', '120', '60', '80', '200', '0', '0', '250', '60', { text: '1070.00', textStyle: { bold: true, color: '#B3528A' } }],
                ]}
            />
            <Text style={{ fontSize: 15, color: '#5C646A', lineHeight: 1.45, marginTop: 10 }}>
                历史累计视图把各周期同类奖金相加。以演示数据为例：Elite 累计 730、LeaderShip 累计 375，Car 与 Welcome 均为 0 —— 累计视图不包含 Performance 与 Total 两项。
            </Text>
        </Box>
    </Box>

    {/* ===== C 区 页脚 ===== */}
    <Box style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Box style={{ width: 10, height: 10, background: '#202259', borderRadius: 2 }} />
            <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>AQUALIFE · 前端系统功能讲解</Text>
        </Box>
        <Text style={{ fontSize: 14, color: '#5C646A', letterSpacing: 0.3 }}>21 / 25</Text>
    </Box>
</Slide>
