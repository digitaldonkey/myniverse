export function getServerStatus(status = []) {
  const STATUS = [
    {
      value: 'new',
      label: 'New (data yet)',
    },
    {
      value: 'active',
      label: 'OK (active)',
    },
    {
      value: 'disabled',
      label: 'disabled (due peer requirements)',
    },
    {
      value: 'unreachable',
      label: 'Unreachable domain',
    },
    {
      value: 'no-trends',
      label: 'Unreachable trends request',
    },
    {
      value: 'error',
      label: 'Fetch error',
    },
    // {
    //   value: 'blacklisted',
    //   label: 'Blacklisted',
    // },
  ];
  if (status.length) {
    return STATUS.filter((s) => status.includes(s.value));
  }
  return STATUS;
}

export function getStatusIcon(status) {
  switch (status) {
    case 'active':
      return (
        <svg height="1.4em" width="1.4em" viewBox="0 0 1000 1000">
          <g>
            <path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490s490-219.4,490-490S770.6,10,500,10z M754.6,249.3l86.1,86.1L513.4,664.6l-86.1,86.1l-86.1-86.1L159.3,482.8l86.1-86.1l181.8,181.8L754.6,249.3z" />
          </g>
        </svg>
      );
    case 'error':
    case 'unreachable':
      return (
        <svg
          fill="var(--color-error)"
          height="1.4em"
          width="1.4em"
          viewBox="0 0 512 512"
        >
          <g>
            <path
              d="M320,320v64c0,35.297-28.688,64-64,64s-64-28.703-64-64v-64h-64v64c0,70.578,57.438,128,128,128s128-57.422,128-128v-64
          H320z"
            />
            <path
              d="M256,0c-70.563,0-128,57.422-128,128v64h64v-64c0-35.297,28.688-64,64-64s64,28.703,64,64v64h64v-64
          C384,57.422,326.563,0,256,0z"
            />
            <path d="M496,240h-80c-8.844,0-16,7.164-16,16s7.156,16,16,16h80c8.844,0,16-7.164,16-16S504.844,240,496,240z" />
            <path
              d="M416.016,224c3.344,0,6.703-1.039,9.578-3.203l64-48c7.078-5.297,8.516-15.328,3.203-22.398
          c-5.297-7.063-15.328-8.516-22.391-3.195l-64,48c-7.078,5.297-8.516,15.328-3.203,22.398C406.344,221.789,411.141,224,416.016,224z
          "
            />
            <path d="M96,240H16c-8.844,0-16,7.164-16,16s7.156,16,16,16h80c8.844,0,16-7.164,16-16S104.844,240,96,240z" />
            <path
              d="M86.406,220.797c2.875,2.164,6.234,3.203,9.578,3.203c4.875,0,9.672-2.211,12.813-6.398
          c5.313-7.07,3.875-17.102-3.203-22.398l-64-48c-7.047-5.32-17.094-3.852-22.391,3.195c-5.313,7.07-3.875,17.102,3.203,22.398
          L86.406,220.797z"
            />
            <path
              d="M86.406,291.203l-64,48c-7.078,5.297-8.516,15.328-3.203,22.398c3.141,4.188,7.938,6.398,12.812,6.398
          c3.344,0,6.703-1.039,9.578-3.203l64-48c7.078-5.297,8.516-15.328,3.203-22.398C103.5,287.328,93.453,285.883,86.406,291.203z"
            />
            <path
              d="M425.594,291.203c-7.063-5.32-17.078-3.867-22.391,3.195c-5.313,7.07-3.875,17.102,3.203,22.398l64,48
          c2.875,2.164,6.234,3.203,9.578,3.203c4.875,0,9.672-2.211,12.813-6.398c5.313-7.07,3.875-17.102-3.203-22.398L425.594,291.203z"
            />
          </g>
        </svg>
      );
    case 'new':
      return (
        <svg height="1.4em" width="1.4em" viewBox="0 0 47.94 47.94">
          <path
            fill="var(--color-warning)"
            d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
            c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
            c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
            c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
            c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
            C22.602,0.567,25.338,0.567,26.285,2.486z"
          />
        </svg>
      );
    case 'no-trends':
    case 'disabled':
      return (
        <svg
          x="0px"
          y="0px"
          height="1.4em"
          width="1.4em"
          viewBox="0 0 122.879 122.879"
          enableBackground="new 0 0 122.879 122.879"
        >
          <g>
            <path
              fill="var(--color-error)"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"
            />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

// Filter
export const filterByStatus = (array, status) => {
  return array.filter((s) => {
    return status.some((v) => (s.status ? s.status.includes(v.value) : false));
  });
};
