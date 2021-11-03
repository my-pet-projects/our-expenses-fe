import SearchOutlined from '@ant-design/icons/lib/icons/SearchOutlined';
import { Button, Card, Col, DatePicker, Row, Space } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ReportDateRange } from 'src/models';
import { applyReportFilter } from 'src/report/state/actions';

import './ReportFilter.scss';

export const ReportFilter = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const month = searchParams.get('month');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const monthDateFormat = 'MMMM YYYY';
    const dayDateFormat = 'DD MMM YYYY';
    const queryMonthFormat = 'YYYY-MM';
    const queryDateFormat = 'YYYY-MM-DD';

    useEffect(() => {
        if (month) {
            const monthFromQuery = moment.utc(month, queryMonthFormat);
            const dateRange = dateRangeFromMonth(monthFromQuery);
            dispatch(applyReportFilter(dateRange));
            return;
        }
        if (from && to) {
            const fromQuery = moment.utc(from, queryDateFormat);
            const toQuery = moment.utc(to, queryDateFormat);
            const dateRange = dateRangeFromRange(fromQuery, toQuery);
            dispatch(applyReportFilter(dateRange));
            return;
        }
    }, [dispatch, month, from, to]);

    const dateRangeFromRange = (fromMoment: Moment, toMoment: Moment): ReportDateRange => {
        const dateFrom = moment.utc(fromMoment).startOf('day');
        const dateTo = moment.utc(toMoment).endOf('day');
        const dateRange = {
            from: dateFrom.toISOString(),
            to: dateTo.toISOString()
        } as ReportDateRange;
        return dateRange;
    };

    const dateRangeFromMonth = (monthMoment: Moment): ReportDateRange => {
        const dateFrom = moment.utc(monthMoment).startOf('month');
        const dateTo = moment.utc(monthMoment).endOf('month');
        const dateRange = {
            from: dateFrom.toISOString(),
            to: dateTo.toISOString()
        } as ReportDateRange;
        return dateRange;
    };

    const handleDateRangeChange = (values: [Moment | null, Moment | null] | null): void => {
        if (!values || !values[0] || !values[1]) {
            return;
        }
        const fromFromString = values[0].format(queryDateFormat);
        const toFromString = values[1].format(queryDateFormat);
        setSearchParams({ from: fromFromString, to: toFromString });
    };

    const handleMonthChange = (value: Moment | null): void => {
        if (!value) {
            return;
        }
        const dateFromString = value.format(queryMonthFormat);
        setSearchParams({ month: dateFromString });
    };

    return (
        <div className="report-filter">
            <Card>
                <Row justify="space-between">
                    <Col>
                        {!(from && to) && (
                            <Space>
                                Month
                                <DatePicker
                                    onChange={handleMonthChange}
                                    picker="month"
                                    format={monthDateFormat}
                                    value={month ? moment(month, queryMonthFormat) : null}
                                />
                            </Space>
                        )}
                        {from && to && (
                            <Space>
                                Date range
                                <DatePicker.RangePicker
                                    onChange={handleDateRangeChange}
                                    format={dayDateFormat}
                                    value={[
                                        from ? moment(from, queryDateFormat) : null,
                                        to ? moment(to, queryDateFormat) : null
                                    ]}
                                />
                            </Space>
                        )}
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
