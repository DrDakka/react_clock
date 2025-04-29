import React, { useState, useEffect } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type Props = {
  clockName: string;
};

class Clock extends React.Component<Props> {
  state = {
    time: new Date().toUTCString().slice(-12, -4),
  };

  intervalId: number | null = null;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      const now = new Date().toUTCString().slice(-12, -4);

      this.setState({ time: now });
      // eslint-disable-next-line no-console
      console.log(now);
    }, 1000);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.clockName !== this.props.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.clockName}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.time}</span>
      </div>
    );
  }
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setClockName(getRandomName());
    }, 3300);

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      setHasClock(false);
    });

    document.addEventListener('click', () => {
      setHasClock(true);
    });

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
