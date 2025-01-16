import React, { useState } from 'react';
import { Button, Input, message, Tooltip } from 'antd';
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { invoke } from '@tauri-apps/api/core';

const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  const passwordRules = (
    <div>
      <p>密码规则：</p>
      <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
        <li>长度为12-18位</li>
        <li>必须以字母开始</li>
        <li>至少包含1个大写字母</li>
        <li>至少包含1个小写字母</li>
        <li>至少包含1个数字</li>
        <li>包含2个特殊字符</li>
        <li>不允许连续重复字符超过5次</li>
        <li>不包含常见键盘模式（如qwerty等）</li>
      </ul>
    </div>
  );

  const handleGeneratePassword = async () => {
    try {
      const generatedPw = await invoke('generate_pw');
      setPassword(generatedPw as string);
    } catch (error) {
      console.error('生成密码时出错:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      message.success('密码已复制到剪贴板');
    } catch (err) {
      message.error('复制失败');
    }
  };

  return (
    <div >
      <h1>
        密码生成器
        <Tooltip title={passwordRules} placement="right">
          <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px' }} />
        </Tooltip>
      </h1>
      <Button type="primary" onClick={handleGeneratePassword}>
        生成密码
      </Button>
      <div style={{ marginTop: '20px' }}>
        提示：生成的密码请自行保管好，本软件不会存储
      </div>
      {password && (
        <div style={{ marginTop: '20px' }}>
          <h3>生成的密码：</h3>
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 32px)' }}
              value={password}
              readOnly
            />
            <Button icon={<CopyOutlined />} onClick={handleCopy} />
          </Input.Group>
        </div>
      )}
    </div>
  );
};

export default PasswordPage; 