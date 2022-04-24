import { Link, useSearchParams } from "react-router-dom";

const User = () => {
    const [params,] = useSearchParams();
    console.log('params', params.get('qq'));

    return (
        <div>
            用户管理
            <ul>
                <li><Link to={'/user/detail/1'}>用户1</Link></li>
                <li><Link to={'/user/detail/2'}>用户2</Link></li>
                <li><Link to={'/user/detail/3'}>用户3</Link></li>
                <li><Link to={'/user/detail/4'}>用户4</Link></li>
            </ul>
        </div>
    )
}

export default User;