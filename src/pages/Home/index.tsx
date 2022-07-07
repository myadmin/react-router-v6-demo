import { useRequest, useAntdTable } from 'ahooks';
import { Table, Tooltip } from "antd";
import axios from 'axios';
import "antd/dist/antd.css";

interface paramProps {
    current: number;
    pageSize: number;
}

const appKey = {
    app_id: "igjdforswgxwmnvp",
    app_secret: "ekNiWThUVUszOUxqU1BPb013cUNCQT09"
};

const pageList = async (param: paramProps) => {
    const { pageSize, current } = param;
    return await axios.get(
        `https://www.mxnzp.com/api/jokes/list?page=${current}&limit=${pageSize}&app_id=${appKey.app_id}&app_secret=${appKey.app_secret}`
    );
};

const detail = async () => {
    return await axios.get(
        `https://www.mxnzp.com/api/rubbish/type?name=西瓜&app_id=${appKey.app_id}&app_secret=${appKey.app_secret}`
    );
};

export default () => {
    const { tableProps } = useAntdTable(async (param: paramProps) => {
        const { data }: any = await pageList(param);
        if (data.code) {
            return {
                total: data?.data?.totalPage,
                list: data?.data?.list
            };
        }
        throw data;
    });

    const { data } = useRequest(async () => {
        const { data } = await detail();
        if (data.code) {
            return data.data;
        }
    });

    const columns = () => {
        return [
            {
                title: "content",
                dataIndex: "content",
                key: "content",
                ellipsis: {
                    showTitle: false
                },
                render: (content: string) => (
                    <Tooltip placement="topLeft" title={content}>
                        {content}
                    </Tooltip>
                )
            },
            {
                title: "updateTime",
                dataIndex: "updateTime",
                key: "updateTime",
                width: 180
            }
        ];
    };

    return (
        <>
            <Table
                rowKey="content"
                columns={columns()}
                size="large"
                {...(tableProps as any)}
                dataSource={tableProps.dataSource}
                loading={tableProps.loading}
                pagination={{
                    ...(tableProps.pagination as any),
                    showSizeChanger: false
                }}
            />
            <p>
                {data?.aim?.goodsName} - {data?.aim?.goodsType}
            </p>
            <p>
                {(data?.recommendList || [])?.map((item: any) => (
                    <span key={item.goodsName}>
                        {item.goodsName}-{item.goodsType}
                    </span>
                ))}
            </p>
        </>
    );
};