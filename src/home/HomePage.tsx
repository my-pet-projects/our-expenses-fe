import { Col, Row, Typography } from 'antd';

import { Panel } from 'src/common/components';

export const HomePage = (): JSX.Element => (
    <Panel>
        <Row justify="center" align="middle" style={{ height: '70vh' }}>
            <Col>
                <img src="piggy.svg" width="200px" />
                <Typography.Paragraph>
                    <Typography.Text strong style={{ fontSize: 30 }}>
                        Our Expenses
                    </Typography.Text>
                </Typography.Paragraph>
            </Col>
        </Row>
    </Panel>
);