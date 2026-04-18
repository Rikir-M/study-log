import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectGroup {
  label?: string;
  items: SelectOption[];
}

interface ReusableSelectProps {
  groups: SelectGroup[];
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const SelectType = ({ 
  groups, 
  placeholder = "Select an option...", 
  label = "Options",
  ...props 
}: ReusableSelectProps) => (
  <Select.Root {...props}>
    <Select.Trigger
      className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet-700 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-slate-50 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-400"
      aria-label={label}
    >
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <ChevronDown size={16} />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35)]">
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-700">
          <ChevronUp size={16} />
        </Select.ScrollUpButton>
        
        <Select.Viewport className="p-[5px]">
          {groups.map((group, index) => (
            <React.Fragment key={group.label || index}>
              <Select.Group>
                {group.label && (
                  <Select.Label className="px-[25px] text-xs leading-[25px] text-slate-500">
                    {group.label}
                  </Select.Label>
                )}
                {group.items.map((item) => (
                  <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select.Group>
              {index < groups.length - 1 && (
                <Select.Separator className="m-[5px] h-px bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </Select.Viewport>

        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet-700">
          <ChevronDown size={16} />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef<
  HTMLDivElement,
  Select.SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet-700 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[disabled]:text-slate-400 data-[highlighted]:text-white data-[highlighted]:outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <Check size={14} />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectType;
