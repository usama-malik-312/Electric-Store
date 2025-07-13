import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/app/lib/api/client'
// import { apiClient } from '../..//lib/api'

type FieldType = {
    identifier: string
    password: string
}

export default function LoginPage() {
    const router = useRouter()
    const { mutate: login, isPending } = useMutation({
        mutationFn: (values: FieldType) =>
            apiClient.post('/auth/login', values),
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.token)
            router.push('/dashboard')
        },
    })

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={login}
                className="w-full max-w-md space-y-4 p-8 shadow-lg"
            >
                <h1 className="text-center text-2xl font-bold">Electric Store</h1>

                <Form.Item<FieldType>
                    name="identifier"
                    rules={[{ required: true, message: 'Please input your email or phone!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email or Phone" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        loading={isPending}
                    >
                        Log in
                    </Button>
                </Form.Item>

                <div className="text-center">
                    <Link href="/register" className="text-primary">Register now</Link>
                </div>
            </Form>
        </div>
    )
}